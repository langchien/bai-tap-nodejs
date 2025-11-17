import { Input } from '@/components/ui/input'
import { useNavigate } from 'react-router'
import { useDebouncedCallback } from 'use-debounce'
import { Button } from './ui/button'

export default function SearchForm({ defaultQuery }: { defaultQuery?: string }) {
  const navigate = useNavigate()
  const onSearchChange = useDebouncedCallback((query: string) => {
    navigate(query ? `/?q=${encodeURIComponent(query)}` : '/')
  }, 1000)
  const onReset = () => {
    navigate('/')
  }
  return (
    <>
      <div className='flex-1 min-w-xl'>
        <Input
          defaultValue={defaultQuery}
          placeholder='Tìm kiếm theo tên, email hoặc số điện thoại...'
          onChange={(e) => onSearchChange(e.target.value)}
          className='pr-8'
        />
      </div>
      <Button variant='secondary' onClick={onReset}>
        Đặt lại
      </Button>
    </>
  )
}
