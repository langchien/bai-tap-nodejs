import { USER_STATUS } from '@/api-request/user/user.schema'
import { useSearchParams } from 'react-router'
import { StatusBadge } from './result-table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

export function FilterUser() {
  const [searchParams, setSearchParams] = useSearchParams()
  const status = searchParams.get('status') ?? 'all'
  const setStatus = (status: string) => {
    setSearchParams((prev) => {
      prev.set('status', status)
      return prev
    })
  }
  return (
    <Select value={status} onValueChange={setStatus}>
      <SelectTrigger className='w-[150px]'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='all'>Tất Cả</SelectItem>
        <SelectItem value={USER_STATUS.ACTIVE}>
          <StatusBadge status={USER_STATUS.ACTIVE} />
        </SelectItem>
        <SelectItem value={USER_STATUS.INACTIVE}>
          <StatusBadge status={USER_STATUS.INACTIVE} />
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
