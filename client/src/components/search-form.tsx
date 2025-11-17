'use client'

import { Input } from '@/components/ui/input'
import { useCrudUser } from '../hooks/use-crud-user'
import { Button } from './ui/button'

export default function SearchForm() {
  const { resetUsers, searchQuery, onSearchChange } = useCrudUser()
  return (
    <>
      <div className='flex-1 min-w-xl'>
        <Input
          placeholder='Tìm kiếm theo tên, email hoặc số điện thoại...'
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className='pr-8'
        />
      </div>
      <Button variant='secondary' onClick={resetUsers}>
        Đặt lại
      </Button>
    </>
  )
}
