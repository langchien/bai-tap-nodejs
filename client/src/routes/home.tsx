import AddUserForm from '@/components/add-user-form'
import { FilterUser } from '@/components/filter-user'
import ResultTable from '@/components/result-table'
import SearchForm from '@/components/search-form'
import { Card } from '@/components/ui/card'
import type { Route } from '../+types/root'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Lăng Tiến code reactjs' },
    { name: 'description', content: 'Chào mừng đến với trang quản lý người dùng' },
  ]
}

export default function Home() {
  return (
    <div className='bg-background p-6'>
      <div className='max-w-7xl mx-auto space-y-8'>
        <div className='flex gap-5 items-center justify-between mb-5'>
          <div className='space-y-2 flex-1'>
            <h1 className='text-4xl font-bold text-foreground'>Quản Lý Người Dùng</h1>
            <p className='text-muted-foreground'>
              Quản lý thông tin và hoạt động của các thành viên
            </p>
          </div>
          <AddUserForm />
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
