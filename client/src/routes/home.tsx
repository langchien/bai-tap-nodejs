import { userRequest } from '@/api-request/user/user.request'
import CreateUserForm from '@/components/create-user-form'
import { FilterUser } from '@/components/filter-user'
import ResultTable from '@/components/result-table'
import SearchForm from '@/components/search-form'
import { Card } from '@/components/ui/card'
import type { Route } from './+types/home'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Lăng Tiến code reactjs' },
    { name: 'description', content: 'Chào mừng đến với trang quản lý người dùng' },
  ]
}
export async function clientLoader({ request }: Route.LoaderArgs) {
  const query = new URL(request.url).searchParams.get('q') ?? undefined
  const data = await userRequest.findAll({ q: query })
  const status = new URL(request.url).searchParams.get('status') ?? 'all'
  const dataFiltered = data.filter((user) => {
    if (status === 'all') return true
    return user.status === status
  })
  return { dataFiltered, query }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { dataFiltered, query } = loaderData
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
          <CreateUserForm />
        </div>
        <Card className='flex flex-row gap-5 p-5'>
          <SearchForm defaultQuery={query} />
          <FilterUser />
        </Card>
        <ResultTable resultUsers={dataFiltered} />
      </div>
    </div>
  )
}
