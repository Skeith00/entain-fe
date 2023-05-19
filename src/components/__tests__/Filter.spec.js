import { describe, it, expect, beforeEach, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import Filter from '@/components/Filter.vue'

describe('Filter', () => {
  const $store = {
    state: {
      category: ''
    },
    dispatch: vi.fn()
  }

  it('calls updateCategory when a category is selected', () => {

    const wrapper = shallowMount(Filter, { 
      global: {
        mocks: {
          $store
        }
      }
     })

    // Simulate a category selection
    const select = wrapper.find('select')
    select.setValue('9daef0d7-bf3c-4f50-921d-8e818c60fe61')
    select.trigger('change')

    // Assert that updateCategory has been called with the correct value
    expect($store.dispatch).toHaveBeenCalled()
    expect($store.dispatch).toHaveBeenCalledWith('updateCategory', '9daef0d7-bf3c-4f50-921d-8e818c60fe61')
  })

  it('renders the options correctly', () => {
    const wrapper = shallowMount(Filter, { 
      global: {
        mocks: {
          $store
        }
      }
     })

    // Assert the rendered options
    const options = wrapper.findAll('option')
    expect(options).toHaveLength(4) // Includes the "All" option

    expect(options.at(0).text()).toBe('All')
    expect(options.at(0).element.value).toBe('')

    expect(options.at(1).text()).toBe('Greyhound Racing')
    expect(options.at(1).element.value).toBe('9daef0d7-bf3c-4f50-921d-8e818c60fe61')

    expect(options.at(2).text()).toBe('Harness Racing')
    expect(options.at(2).element.value).toBe('161d9be2-e909-4326-8c2c-35ed71fb460b')

    expect(options.at(3).text()).toBe('Horse Racing')
    expect(options.at(3).element.value).toBe('4a2788f8-e825-4d36-9894-efd4baf1cfae')
  })
})
