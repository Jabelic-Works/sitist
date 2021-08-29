import { mount } from '@vue/test-utils'
import AddInfoDialog from '@/components/AddInfoDialog'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

describe('Logo', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(AddInfoDialog)
    expect(wrapper.vm).toBeTruthy()
    const wrapperFooter = mount(Footer)
    expect(wrapperFooter.vm).toBeTruthy()
    const wrapperHeader = mount(Header)
    expect(wrapperHeader.vm).toBeTruthy()
  })
})
