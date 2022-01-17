import express from 'express'

import {
  getStudents,
  getStudent,
  addStudent,
  updateStudent,
  removeStudent
} from '../controllers/student.js';

const router = express.Router()

router.get('/api/students', getStudents)
router.get('/api/students/:id', getStudent)
router.post('/api/students', addStudent)
router.put('/api/students/:id', updateStudent)
router.delete('/api/students/:idOrEmail', removeStudent)

export default router