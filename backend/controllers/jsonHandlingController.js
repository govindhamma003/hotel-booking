const fs = require('fs');
const path = require('path');
const logger = require('../helper/logger').createLogger('jsonHandlingController')

class JsonHandlingController {
  constructor() {
    this.availableRooms = this.availableRooms.bind(this);
    this.updateRooms = this.updateRooms.bind(this);
  }

  async availableRooms(req, res) {
    try {
      const jsonFilePath = path.resolve(__dirname, '../data/rooms.json');
      const fileContent = fs.readFileSync(jsonFilePath, 'utf8');
      const rooms = JSON.parse(fileContent);

      res.status(200).json({
        status: true,
        message: 'Rooms pulled successfully',
        data: rooms
      });
    } catch (error) {
      logger.error('booking - Error while fetching the available rooms:', error)
      res.status(500).json({
        status: false,
        message: 'Error while fetching rooms.'
      })
    }
  }

  async updateRooms(req, res) {
    try {
      const { rooms } = req.body.data;
      const jsonFilePath = path.resolve(__dirname, '../data/rooms.json');

      if (!Array.isArray(rooms)) {
        return res.status(400).json({
          status: false,
          message: 'Invalid data format. Expected an array of rooms.',
        });
      }

      fs.writeFileSync(jsonFilePath, JSON.stringify(rooms, null, 2), 'utf8');

      res.status(200).json({
        status: true,
        message: 'Rooms updated successfully',
      });
    } catch (error) {
      logger.error('Error while updating rooms:', error);
      res.status(500).json({
        status: false,
        message: 'Error while updating rooms.',
      });
    }
  }
}

module.exports = new JsonHandlingController()
