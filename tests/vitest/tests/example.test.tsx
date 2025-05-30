import CardStandard from '@/components/ui/card-standard'
import { render, screen } from '@testing-library/react'

describe('Example test with react component', () => {
  test('Should show title', () => {
    render(<CardStandard title={'Testing'} />)

    expect(screen.getByText(/Testing/i)).toBeInTheDocument()
  })
})
