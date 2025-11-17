import ResultTable from '@/components/result-table'
import SearchForm from '@/components/search-form'
import { FilterUser } from './filter-user'
import { Card } from './ui/card'

export default function UserHome() {
  return (
    <div className='bg-background p-6'>
      <div className='max-w-7xl mx-auto space-y-8'>
        <div className='space-y-2'>
          <h1 className='text-4xl font-bold text-foreground'>Quản Lý Người Dùng</h1>
          <p className='text-muted-foreground'>Quản lý thông tin và hoạt động của các thành viên</p>
        </div>
        <Card className='flex flex-row gap-5 p-5'>
          <SearchForm />
          <FilterUser />
        </Card>
        <ResultTable />
      </div>
    </div>
  )
}
