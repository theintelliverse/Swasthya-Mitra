const QueueCounter = require("../models/queue/QueueCounterModel");
const moment = require("moment");

async function getNextQueueNumber(clinicId, doctorUserId) {
  const today = moment().format("YYYY-MM-DD");

  let counter = await QueueCounter.findOne({ clinicId, doctorUserId, date: today });

  if (!counter) {
    counter = await QueueCounter.create({
      clinicId,
      doctorUserId,
      date: today,
      currentNumber: 0
    });
  }

  counter.currentNumber += 1;
  await counter.save();

  return counter.currentNumber;
}

module.exports = { getNextQueueNumber };
