import { useCrudUser } from '../hooks/use-crud-user'
import { StatusBadge } from './result-table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

export function FilterUser() {
  const { status, setStatus } = useCrudUser()
  return (
    <Select value={status} onValueChange={setStatus}>
      <SelectTrigger className='w-[150px]'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='all'>Tất Cả</SelectItem>
        <SelectItem value='active'>
          <StatusBadge status='active' />
        </SelectItem>
        <SelectItem value='inactive'>
          <StatusBadge status='inactive' />
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
