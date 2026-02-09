import { Route, Routes } from 'react-router-dom'
import BasicLayout from './components/layout/BasicLayout'
import ManagerLayout from './components/layout/ManagerLayout'
import Join from './pages/member/Join'
import './reset.css'
import BookList from './pages/book/BookList'
import Login from './pages/member/Login'

function App() {

  return (
    <>
      <Routes>
        {/* localhost:5173 */}
        {/* 일반 회원이 접근하는 페이지들 */}
        <Route 
          path='/'
          element={<BasicLayout/>}
        >
          {/* Route를 아래와 같이 중복으로 사용하면 두 컴포넌트를 함께 띄울수 있다 */}
          {/* 이때 컴포넌트에 접근하는 url은 바깥 Route와 안쪽 Route의 path 나열로 지정 */}
          {/* 단, 안쪽 Route의 path 속성 값은 '/'를 붙이지 않는다 */}
          {/* 바깥 컴포넌트에 <Outlet/>을 사용하여 함께 열리는 컴포넌트의 위치를 지정한다 */}
          {/* 도서목록 페이지 */}
          <Route
            path=''
            element={<BookList/>}
          />
          <Route  // 회원가입 페이지 localhost:5173/join
          // Route 안에 또 Route는 path에 슬러쉬(/)가 붙지 않는다. 자동으로 붙음
          // 대신 BasicLayout 컴포넌트 중 Join 컴포넌트가 들어갈 자리에 <Outlet/> 태그를 추가해야함
            path='join'
            element={<Join/>}
          />
          {/* 로그인 페이지 localhost:5173/login */}
          <Route
            path='login'
            element={<Login/>}
          />
        </Route>


        {/* 매니저 권한의 회원이 접근하는 페이지들 */}
        <Route 
          path='/manage' 
          element={<ManagerLayout/>}
        >
          <Route
            path='join'
            element={<Join/>}
          />
        </Route>


      </Routes>



      {/* <BasicLayout />
      <ManagerLayout />
      <Join /> */}
    </>
  )
}

export default App
