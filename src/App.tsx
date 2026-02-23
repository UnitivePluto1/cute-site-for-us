import { Route, Routes } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import RequireAuth from './lib/auth/RequireAuth'
import Login from './pages/auth/Login'
import Valentines from './pages/events/Valentines'
import EditLetter from './pages/Letters/EditLetter'
import LetterDetail from './pages/Letters/LetterDetail'
import Letters from './pages/Letters/Letters'
import WriteLetter from './pages/Letters/WriteLetter'
import MainMenu from './pages/MainMenu'
import ThingsToDo from './pages/ThingsToDo/ThingsToDo'
import Timeline from './pages/Timeline/timeline'
import Welcome from './pages/Welcome'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/menu"
          element={
            <RequireAuth>
              <MainMenu />
            </RequireAuth>
          }
        />
        <Route
          path="/letters"
          element={
            <RequireAuth>
              <Letters />
            </RequireAuth>
          }
        />
        <Route
          path="/letters/new"
          element={
            <RequireAuth>
              <WriteLetter />
            </RequireAuth>
          }
        />
        <Route
          path="/letters/edit/:id"
          element={
            <RequireAuth>
              <EditLetter />
            </RequireAuth>
          }
        />
        <Route
          path="/letters/:id"
          element={
            <RequireAuth>
              <LetterDetail />
            </RequireAuth>
          }
        />
        {/* <Route
        path="/cute-thoughts"
        element={
          <RequireAuth>
            <CuteThoughts />
          </RequireAuth>
        }
      /> */}
        <Route
          path="/timeline"
          element={
            <RequireAuth>
              <Timeline />
            </RequireAuth>
          }
        />
        <Route
          path="/events"
          element={
            <RequireAuth>
              <Valentines />
            </RequireAuth>
          }
        />
        <Route
          path="/things"
          element={
            <RequireAuth>
              <ThingsToDo />
            </RequireAuth>
          }
        />

      </Routes>
      <Analytics />
    </>
  )
}

export default App
