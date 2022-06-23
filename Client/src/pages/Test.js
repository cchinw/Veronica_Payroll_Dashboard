// import { useNavigate } from 'react-router'
// import axios from 'axios'
// import { useState, useEffect } from 'react'
// import '@mobiscroll/react/dist/css/mobiscroll.min.css'
// import {
//   Eventcalendar,
//   getJson,
//   toast,
//   setOptions,
//   CalendarNav,
//   SegmentedGroup,
//   SegmentedItem,
//   CalendarPrev,
//   CalendarToday,
//   CalendarNext
// } from '@mobiscroll/react'
// import { Container } from '@mui/material'

// setOptions({
//   theme: 'ios',
//   themeVariant: 'light'
// })

// function Test(props) {
//   const [selected, setSelected] = useState({ 1: true })
//   const [events, setEvents] = useState([])
//   const [filteredEvents, setFilteredEvents] = useState([])
//   const [view, setView] = useState('month')

//   let navigate = useNavigate()

//   const [dailySchedule, setDailySchedule] = useState({
//     day: Date,
//     startTime: '',
//     endTime: '',
//     hours: 0
//   })

//   const [weeklySchedule, setWeeklySchedule] = useState({
//     startDate: Date,
//     endDate: Date,
//     totalHours: 0
//   })

//   const [selectedEmployee, setSelectedEmployee] = useState('Zara Naza')

//   const handleDailyChange = (e) => {
//     setDailySchedule({
//       ...dailySchedule,
//       [e.target.name]: e.target.value
//     })
//   }

//   const handleSelectEmployee = (employee) => {
//     setSelectedEmployee(employee)
//   }

//   const handleWeeklyChange = (e) => {
//     setWeeklySchedule({
//       ...weeklySchedule,
//       [e.target.name]: e.target.value
//     })
//   }

//   const filterEvents = (events, selected) => {
//     let ev = []
//     for (let i = 0; i < events.length; ++i) {
//       const item = events[i]
//       if (selected[item.participant]) {
//         if (item.participant == 1) {
//           item.color = '#328e39'
//         } else if (item.participant == 2) {
//           item.color = '#00aabb'
//         } else if (item.participant == 3) {
//           item.color = '#ea72c0'
//         }
//         ev.push(item)
//       }
//     }

//     setFilteredEvents(ev)
//   }

//   const [calView, setCalView] = useState({
//     schedule: { type: 'week' }
//   })

//   const filter = (ev) => {
//     const value = ev.target.value
//     const checked = ev.target.checked

//     selected[value] = checked

//     setSelected(selected)

//     filterEvents(events, selected)

//     toast({
//       message:
//         (checked ? 'Showing ' : 'Hiding ') +
//         document.querySelector('.md-header-filter-name-' + value).textContent +
//         ' events'
//     })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     const createDailySchedule = async () => {
//       const dailyData = {
//         employeeId: dailySchedule.employeeId,
//         day: dailySchedule.day,
//         startTime: dailySchedule.startTime,
//         endTime: dailySchedule.endTime,
//         hours: dailySchedule.hours
//       }

//       const dailyRes = await axios.post(
//         `${props.BASE_URL}/dailyschedule`,
//         dailyData
//       )
//       console.log(dailyRes, 'DAILY RESPONSE')
//       setDailySchedule({ ...dailySchedule, employeeId: props.allEmployees._id })
//     }

//     const createWeeklySchedule = async () => {
//       const weeklyData = {
//         employeeId: weeklySchedule.employeeId,
//         startDate: weeklySchedule.startDate,
//         endDate: weeklySchedule.endDate,
//         totalHours: weeklySchedule.totalHours
//       }

//       const weeklyRes = await axios.post(
//         `${props.BASE_URL}/weeklyschedule`,
//         weeklyData
//       )
//       // console.log(weeklyRes, 'DAILY RESPONSE')
//       setWeeklySchedule({
//         ...weeklySchedule,
//         employeeId: props.allEmployees._id
//       })
//     }

//     e.preventDefault()
//     await createDailySchedule()
//     await createWeeklySchedule()
//     setDailySchedule({
//       employeeId: '',
//       day: Date,
//       startTime: '',
//       endTime: '',
//       hours: 0
//     })
//     setWeeklySchedule({
//       employeeId: '',
//       startDate: Date,
//       endDate: Date,
//       totalHours: 0
//     })
//     navigate('/schedules')
//   }
//   // console.log(dailySchedule, 'DAILYSCHEDULE')

//   useEffect(() => {
//     getJson(
//       'https://trial.mobiscroll.com/custom-events/',
//       (events) => {
//         setEvents(events)
//         filterEvents(events, selected)
//       },
//       'jsonp'
//     )
//   }, [])

//   const customWithNavButtons = () => {
//     console.log(props.allEmployees, 'MAPPED EMPLOYEES')
//     return (
//       <Container>
//         <CalendarNav className="md-header-filter-nav" />
//         <div className="md-header-filter-controls">
//           <SegmentedGroup select="multiple">
//             {props.allEmployees.map((employee, i) => (
//               <SegmentedItem
//                 value={i}
//                 checked={selected[i]}
//                 onChange={handleWeeklyChange}
//               >
//                 <img
//                   className="md-header-filter-img"
//                   src="https://img.mobiscroll.com/demos/m1.png"
//                 />
//                 <span className="md-header-filter-name md-header-filter-name-1">
//                   {employee.firstName}
//                 </span>
//               </SegmentedItem>
//             ))}
//             {/* <SegmentedItem value={2} checked={selected[2]} onChange={filter}>
//               <img
//                 className="md-header-filter-img"
//                 src="https://img.mobiscroll.com/demos/f1.png"
//               />
//               <span className="md-header-filter-name md-header-filter-name-2">
//                 Hortense
//               </span>
//             </SegmentedItem>
//             <SegmentedItem value={3} checked={selected[3]} onChange={filter}>
//               <img
//                 className="md-header-filter-img"
//                 src="https://img.mobiscroll.com/demos/m2.png"
//               />
//               <span className="md-header-filter-name md-header-filter-name-3">
//                 Carl
//               </span>
//             </SegmentedItem> */}
//           </SegmentedGroup>
//         </div>
//         <CalendarPrev className="md-header-filter-prev" />
//         <CalendarNext className="md-header-filter-next" />
//       </Container>
//     )
//   }

//   return (
//     <Eventcalendar
//       renderHeader={customWithNavButtons}
//       view={calView}
//       data={filteredEvents}
//       cssClass="md-custom-header-filtering"
//     />
//   )
// }

// export default Test
