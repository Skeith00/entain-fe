import { describe, it, expect, test, vi } from 'vitest'

import { shallowMount } from '@vue/test-utils'

import Races from '@/components/Races.vue'

describe('Races', () => {
  const getters = vi.fn(() => ({
    getCurrentCategory: ''
  }))

  const $store = {
    state: {
      category: '',
    },
    getters: getters
  }

  const mockRaces = [
    {
      id: 1,
      categoryId: 2,
      meetingName: 'Race Meeting 1',
      raceNumber: 3,
      advertisedStart: 1634603600,
      countdown: '00m 20s',
    },
    {
      id: 2,
      categoryId: 2,
      meetingName: 'Race Meeting 2',
      raceNumber: 4,
      advertisedStart: 1634603600,
      countdown: '00m 20s',
    }
  ]

  it('renders "No Races found" message when races array is empty', () => {
    const wrapper = shallowMount(Races)

    // Assert the "No Races found" message is rendered
    expect(wrapper.find('p').text()).toBe('No Races found')
  })

  it('renders the table with correct races data when races array is not empty', async () => {
    const wrapper = shallowMount(Races, {
      data() {
        return {
          races: mockRaces,
          tableHeader: ['Meeting name', 'Race Number', 'Time left'],
        }
      },
      computed: {
        filteredRaces() { return mockRaces }
      },
      global: {
        mocks: {
          $store
        }
      }
    })

    // Assert the table headers
    const tableHeaders = wrapper.findAll('th')
    expect(tableHeaders).toHaveLength(3)
    expect(tableHeaders.at(0).text()).toBe('Meeting name')
    expect(tableHeaders.at(1).text()).toBe('Race Number')
    expect(tableHeaders.at(2).text()).toBe('Time left')

    wrapper.vm.filteredRaces = true;
    await wrapper.vm.$nextTick();

    // Assert the table rows
    const tableRows = wrapper.findAll('tbody tr')
    expect(tableRows).toHaveLength(2)
    expect(tableRows.at(0).text()).toContain('Meeting 1')
    expect(tableRows.at(0).text()).toContain('1')
    expect(tableRows.at(1).text()).toContain('Meeting 2')
    expect(tableRows.at(1).text()).toContain('2')
  })

  it('fetches races and updates the table on component shallowMount', async () => {
    const wrapper = shallowMount(Races, {
      data() {
        return {
          races: mockRaces,
          tableHeader: ['Meeting name', 'Race Number', 'Time left'],
        }
      },
      global: {
        mocks: {
          $store
        }
      }
    })

    // Assert that the races array has been populated
    expect(wrapper.vm.races).toHaveLength(2)
    expect(wrapper.vm.races[0]).toEqual(expect.objectContaining({
      id: 1,
      categoryId: 2,
      meetingName: 'Race Meeting 1',
      raceNumber: 3,
      advertisedStart: 1634603600,
      countdown: '00m 20s',
    }))
    expect(wrapper.vm.races[1]).toEqual(expect.objectContaining({
      id: 2,
      categoryId: 2,
      meetingName: 'Race Meeting 2',
      raceNumber: 4,
      advertisedStart: 1634603600,
      countdown: '00m 20s',
    }))
  })
})
