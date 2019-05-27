const LeaveModel = require('../models/leaveModel');

const createLeave = async (req, res) => {
    try {
      const leave = await LeaveModel.create(req.body);
      const response = leave.toJSON();

      res.status(200).json({
        status: 'success',
        data: { leave: response },
      });
    } catch (err) {
      console.log(err);

      res.status(500).json({
        status: 'error',
        message: 'An error occured while creating your Leave 😭',
      });
    }
  };

  const getAllUserLeave = async (req, res) => {
    try {
      //@ts-ignore
      const leave = await LeaveModel.find({ first_name: req.user.first_name })
      .populate('user') // only works if we pushed refs to person.eventsAttended
      .exec(function(err, user) {
          if (err) return handleError(err);
          console.log(user);
          res.json({ status: 'success',
                  data: { user: user }}
                  );
      });

    } catch (err) {
      console.log(err);

      res.status(401).json({ status: 'error', message: err.message });
    }
  };

  const editLeave = async (req, res) => {
    try {
      //@ts-ignore
      const  leaveId= req.params.leaveId
      const leave = await LeaveModel.findById(leaveId);

      res.json({ status: 'success', data: {leave: leave} });
    } catch (err) {
      console.log(err);

      res.status(401).json({ status: 'error', message: err.message });
    }
  };


  const updateLeave = async (req, res) => {
      try {
          //@ts-ignore
          const  leaveId= req.params.leaveId
          const leave = await LeaveModel.findById(leaveId);
          if (!leave) {
              res.json({ status: 'Not Found', message: 'Leave Not Found' })
          } else {
              leave.type_of_leave = req.body.type_of_leave;
              leave.from = req.body.from;
              leave.to = req.body.to;
              leave.reason = req.body.reason;
              leave.save();
          }
          res.json({ status: 'success', data: {leave: leave} });
      } catch (err) {
          console.log(err);

          res.status(401).json({ status: 'error', message: err.message });
      }
  };


const deleteLeave = async (req, res) => {
    try {
        //@ts-ignore
        const  leaveId= req.params.leaveId;
        const leave = await LeaveModel.findByIdAndDelete({_id: leaveId});
        if (!leave) {
            res.json({ status: 'Not Found', message: 'Leave Not Found' })
        }
        res.json({ status: 'success', message: 'Leave removed successfully' });
    } catch (err) {
        console.log(err);

        res.status(401).json({ status: 'error', message: err.message });
    }
};








module.exports = {
    createLeave,
    getAllUserLeave,
    editLeave,
    updateLeave,
    deleteLeave
};
