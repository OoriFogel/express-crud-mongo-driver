// HTTP layer for the user resource.
// router modules handle incoming HTTP requests related to the user resource.
// the HTTP layer is responsible for:
// parsing the request body
// validating the request body
// calling the appropriate service layer function
// returning the appropriate HTTP status code
import express from 'express';
import log from '@ajar/marker';
import * as user_controller from './user.controller.mjs';
/* 
  if there is an error thrown in the DB, asyncMiddleware
  will pass it to next() and express will handle the error */
import raw from '../../middleware/route.async.wrapper.mjs';

log.magenta(`user.router loaded...`);

const router = express.Router();

// parse json req.body on post routes
router.use(express.json());

// CREATES A NEW USER
// router.post("/", async (req, res,next) => {
//    try{
//     const user = await user_controller.create(req.body);
//     res.status(200).json(user);
//    }catch(err){
//       next(err)
//    }
// });

// CREATES A NEW USER
router.post(
  '/',
  raw(async (req, res) => {
    // TODO - validate req.body
    const user = await user_controller.create(req.body);
    res.status(200).json(user);
  }),
);

// GET ALL USERS
router.get(
  '/',
  raw(async (_, res) => {
    const users = await user_controller.getAll();
    res.status(200).json(users);
  }),
);

// GETS A SINGLE USER
router.get(
  '/:id',
  raw(async (req, res) => {
    const user = await user_controller.getOne(req.params.id);
    if (!user) return res.status(404).json({ status: 'No user found.' });
    res.status(200).json(user);
  }),
);
// UPDATES A SINGLE USER
router.put(
  '/:id',
  raw(async (req, res) => {
    const user = await user_controller.updateOne(req.params.id, req.body);
    res.status(200).json(user);
  }),
);

// DELETES A USER
router.delete(
  '/:id',
  raw(async (req, res) => {
    const user = await user_controller.deleteOne(req.params.id);
    if (!user) return res.status(404).json({ status: 'No user found.' });
    res.status(200).json(user);
  }),
);

export default router;
