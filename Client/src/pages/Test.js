import React from 'react'
import { useState, useEffect } from 'react'
import '@mobiscroll/react/dist/css/mobiscroll.min.css'
import {
  Eventcalendar,
  getJson,
  toast,
  setOptions,
  CalendarNav,
  SegmentedGroup,
  SegmentedItem,
  CalendarPrev,
  CalendarToday,
  CalendarNext
} from '@mobiscroll/react'
import { Container } from '@mui/material'

setOptions({
  theme: 'ios',
  themeVariant: 'light'
})

function Test() {
  const [selected, setSelected] = useState({ 1: true })
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [view, setView] = useState('month')

  useEffect(() => {
    getJson(
      'https://trial.mobiscroll.com/custom-events/',
      (events) => {
        setEvents(events)
        filterEvents(events, selected)
      },
      'jsonp'
    )
  }, [])

  const filterEvents = (events, selected) => {
    let ev = []
    for (let i = 0; i < events.length; ++i) {
      const item = events[i]
      if (selected[item.participant]) {
        if (item.participant == 1) {
          item.color = '#328e39'
        } else if (item.participant == 2) {
          item.color = '#00aabb'
        } else if (item.participant == 3) {
          item.color = '#ea72c0'
        }
        ev.push(item)
      }
    }

    setFilteredEvents(ev)
  }

  const [calView, setCalView] = useState({
    schedule: { type: 'week' }
  })

  const filter = (ev) => {
    const value = ev.target.value
    const checked = ev.target.checked

    selected[value] = checked

    setSelected(selected)

    filterEvents(events, selected)

    toast({
      message:
        (checked ? 'Showing ' : 'Hiding ') +
        document.querySelector('.md-header-filter-name-' + value).textContent +
        ' events'
    })
  }

  const customWithNavButtons = () => {
    return (
      <Container>
        <CalendarNav className="md-header-filter-nav" />
        <div className="md-header-filter-controls">
          <SegmentedGroup select="multiple">
            <SegmentedItem value={1} checked={selected[1]} onChange={filter}>
              <img
                className="md-header-filter-img"
                src="https://img.mobiscroll.com/demos/m1.png"
              />
              <span className="md-header-filter-name md-header-filter-name-1">
                Barry
              </span>
            </SegmentedItem>
            <SegmentedItem value={2} checked={selected[2]} onChange={filter}>
              <img
                className="md-header-filter-img"
                src="https://img.mobiscroll.com/demos/f1.png"
              />
              <span className="md-header-filter-name md-header-filter-name-2">
                Hortense
              </span>
            </SegmentedItem>
            <SegmentedItem value={3} checked={selected[3]} onChange={filter}>
              <img
                className="md-header-filter-img"
                src="https://img.mobiscroll.com/demos/m2.png"
              />
              <span className="md-header-filter-name md-header-filter-name-3">
                Carl
              </span>
            </SegmentedItem>
          </SegmentedGroup>
        </div>
        <CalendarPrev className="md-header-filter-prev" />
        <CalendarNext className="md-header-filter-next" />
      </Container>
    )
  }

  return (
    <Eventcalendar
      renderHeader={customWithNavButtons}
      view={calView}
      data={filteredEvents}
      cssClass="md-custom-header-filtering"
    />
  )
}

export default Test
