<template>
    <div v-if="races.length === 0">
        <p>No Races found</p>
    </div>
    <div v-else>
        <table>
            <thead>
                <tr>
                    <th scope="col" v-for="item in tableHeader">{{ item }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="race in filteredRaces" :key="race.id">
                    <td>{{ race.meetingName }}</td>
                    <td>{{ race.raceNumber }}</td>
                    <td>{{ race.countdown }}</td>                    
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      races: [],
      tableHeader: ['Meeting name', 'Race Number', 'Time left'],
    }
  },
  mounted() {
    this.scheduleTasks()
  },
  computed: {
    filteredRaces() {
      /* Computed field that uses the 5 earliest races and filters by category.
      *  it will be triggered every time the vuex state category or the array races is updated.
      */
      let visibleRaces = this.races.slice(0, 5)
      const selectedCategory = this.$store.getters.getCurrentCategory
      if (this.$store.getters.getCurrentCategory != '') {
        visibleRaces = visibleRaces.filter(race => race.categoryId === selectedCategory)
      }
      return visibleRaces
    }
  },
  methods: {
    scheduleTasks() {
        /* Sets an interval every 1 second with two tasks:
          1. Refreshes the race array in case is empty or the first if the first element is expired by more than 60 seconds
          2. Updates the countdown for each race
        */      
        setInterval(() => {
        this.refreshRaces()
        this.races.forEach(race => {
            this.countDown(race);
        });
      }, 1000);
    },
    refreshRaces() {
      // Refreshes the race array in case is empty or the first if the first element is expired by more than 60 seconds
      let firstRace = this.races[0]
      console.log(firstRace)
      if (firstRace == null || this.isExpiredBy60s(firstRace.advertisedStart)) {
        this.fetchRaces()
      }
    },
    fetchRaces() {
      // Fetches 10 races from Entain's API, filters the expired, maps the remaining to a simplified structure and sorts them by advertised_start
      console.log('Fetching Races.')
      axios.get('https://api.neds.com.au/rest/v1/racing/', {
        params: {
          method: 'nextraces',
          // we get 10 instead of 5 because sometimes, the API provides some expired races
          count: 10,
        },
      })
      .then(response => {
        this.races = Object.values(response.data.data.race_summaries).map(race => ({
          // Map each race summary to a new object with desired properties
          id: race.race_id,
          categoryId: race.category_id,
          meetingName: race.meeting_name,
          raceNumber: race.race_number,
          advertisedStart : race.advertised_start.seconds
        }))
        // Filtering all results where the advertised_start ismore than 60s in the past
        .filter(race => !this.isExpiredBy60s(race.advertisedStart))
        // Sorting by advertised_start
        .sort((a, b) => a.advertisedStart - b.advertisedStart)
      })
      .catch(error => {
        console.error('Error fetching races:', error)
      })
    },
    countDown(race) {
      // Update the countdown field for the provided field
      const timeLeft = this.getTimeLeft(race.advertisedStart)
      // Calculate minutes
      const timeLeftInMinutes = timeLeft / 60 
      const minutes = timeLeft < 0 ?  Math.ceil(timeLeftInMinutes) : Math.floor(timeLeftInMinutes)
      // Calculate seconds
      const seconds = timeLeft % 60
      // Add leading zero if needed
      const formattedMinutes = String(minutes).padStart(2, '0')
      // Add leading zero if needed
      const formattedSeconds = String(seconds).padStart(2, '0')
      // Format the countdown
      race.countdown = `${formattedMinutes}m ${formattedSeconds}s`
    },
    getCurrentTimeInSeconds() {
      const now = new Date().getTime()
      // Converting from ms to s
      return Math.round(now / 1000)
    },
    isExpiredBy60s(advertisedStart) {
      return this.getTimeLeft(advertisedStart) < -60
    },
    getTimeLeft(advertisedStart) {
      return advertisedStart - this.getCurrentTimeInSeconds()
    }
  }
};
</script>

<style scoped>
    table {
        border-collapse: collapse;
        margin: 25px 0;
        font-size: 0.9em;
        min-width: 400px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    }

    table thead tr {
        background-color: #009879;
        color: #ffffff;
        text-align: left;
        text-align: center
    }

    table th, table td {
        padding: 12px 15px;
        text-align: center
    }

    table tbody tr {
        border-bottom: 1px solid #dddddd;
    }

    table tbody tr:nth-of-type(even) {
        background-color: #f3f3f3;
    }

    table tbody tr:last-of-type {
        border-bottom: 2px solid #009879;
    }
</style>
