import { useNavigate } from 'react-router'
import axios from 'axios'
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  ButtonGroup
} from '@mui/material'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import { Container } from '@mui/system'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

export default function Employees(props) {
  let navigate = useNavigate()

  const deleteEmployee = async (employeeId) => {
    const res = await axios.delete(`${props.BASE_URL}/employee/${employeeId}`)
    props.getEmployees()
  }

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            Employees List
          </Typography>
          <Typography variant="h4" component="div">
            <Button
              size="medium"
              onClick={() => {
                navigate('/employee')
              }}
            >
              <PersonAddAltIcon />
              Add new Employee
            </Button>
          </Typography>
          <Typography variant="body">
            {props.allEmployees &&
              props.allEmployees.map((employee) => (
                <Container
                  className="child"
                  key={employee.id}
                  // onClick={() => navigate(`/employee/${employee._id}`)}
                  style={{ border: `5px solid #0064f4` }}
                >
                  <div>
                    <h3>
                      Full name: {employee.firstName} {employee.lastName}
                    </h3>
                    <h4>Current Employee: {employee.currentStatus}</h4>
                  </div>
                  <ButtonGroup>
                    <Button onClick={() => deleteEmployee(employee._id)}>
                      <DeleteIcon />
                    </Button>
                    <Button
                      onClick={() => navigate(`/employee/${employee._id}`)}
                    >
                      <EditIcon />
                    </Button>
                  </ButtonGroup>
                </Container>
              ))}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}
