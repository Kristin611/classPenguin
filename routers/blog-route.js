// routes.js
const router = require('express').Router();
const {
  getThoughts
} = require('../../controllers/thoughcontroller');

router.route('/').get(getThoughts)

//const router = require('express').Router();
const {
  getSingleThought
} = require('../../controllers/thoughcontroller');

router.route('/:thoughtId').get(getSingleThought)

//const router = require('express').Router();
const {
  createThoughts
} = require('../../controllers/thoughcontroller');

router.route('/').post(createThoughts)


const {
  updateThought
} = require('../../controllers/thoughcontroller');

router.route('/:thoughtId').put(updateThought)


const {
  deleteThought
} = require('../../controllers/thoughcontroller');

router.route('/:thoughtId').delete(deleteThought)



const { 
  createReaction, removeReaction
 } = require('../../controllers/thoughcontroller');

router.route('/:thoughtId/reactions').post(createReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);


module.exports = router;