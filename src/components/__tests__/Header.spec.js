import { describe, it, expect } from 'vitest'

import { shallowMount, getStyle } from '@vue/test-utils'
import Header from '@/components/Header.vue'

describe('Header', () => {
  it('renders the correct title and subtitle', () => {
    const title = 'Test Title'
    const subtitle = 'Test Subtitle'

    const wrapper = shallowMount(Header, { propsData: { title, subtitle } })

    // Assert the rendered title and subtitle
    expect(wrapper.find('h1').text()).toBe(title)
    expect(wrapper.find('p').text()).toBe(subtitle)
  })

  it('renders the title only if subtitle is not provided', () => {
    const title = 'Test Title'

    const wrapper = shallowMount(Header, { propsData: { title } })

    // Assert the rendered title and subtitle
    expect(wrapper.find('h1').text()).toBe(title)
    expect(wrapper.find('p').exists()).toBe(true)
    expect(wrapper.find('p').text()).toBe('')

  })

  it('renders the header with correct styles', () => {
    const title = 'Test Title'
    const subtitle = 'Test Subtitle'

    const wrapper = shallowMount(Header, { propsData: { title, subtitle } })

    // Assert specific class applied to the header element
    expect(wrapper.classes('header')).toBe(true)
  })
})
