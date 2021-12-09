import express from 'express'

import {
  getStudents,
  getStudentById,
  addStudent,
  updateStudentById,
  removeStudentByEmail
} from '../controllers/student.js';

const router = express.Router()

router.get('/students', getStudents)
router.get('/students/:id', getStudentById)
router.post('/students', addStudent)
router.put('/students/:id', updateStudentById)
router.delete('/students/:email', removeStudentByEmail)

export default router