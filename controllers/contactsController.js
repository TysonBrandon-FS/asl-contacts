const { 
  ContactModel,
  Pager,
  sortContacts,
  filterContacts
} = require("@jworkman-fs/asl");


const getAllContacts = (req, res) => {
  try {
    let contacts = ContactModel.index();

    if (req.get('X-Filter-By') && req.get('X-Filter-Operator') && req.get('X-Filter-Value')) {
      contacts = filterContacts(
        contacts,
        req.get('X-Filter-By'),
        req.get('X-Filter-Operator'),
        req.get('X-Filter-Value')
      );
    }
    
    if (req.query.sort && req.query.direction) {
      contacts = sortContacts(contacts, req.query.sort, req.query.direction);
    }
    
    //pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.size) || 10;
    const pager = new Pager(contacts, page, limit);
    
    res.status(200).json(pager.results());
    
  } catch (e) {
    if (e.name === 'PagerOutOfRangeError') {
      return res.status(400).json({ message: e.message });
    } else if (e.name === 'PagerLimitExceededError') {
      return res.status(400).json({ message: e.message });
    } else if (e.name === 'InvalidEnumError') {
      return res.status(400).json({ message: e.message });
    } else {
      return res.status(500).json({ message: e.message });
    }
  }
};

// POST 
const createContact = (req, res) => {
  try {
    const contact = ContactModel.create(req.body);
    res.status(201).json(contact);
  } catch (e) {
    if (e.name === 'InvalidContactError') {
      return res.status(400).json({ message: e.message });
    } else if (e.name === 'InvalidContactFieldError') {
      return res.status(400).json({ message: e.message });
    } else if (e.name === 'InvalidContactSchemaError') {
      return res.status(400).json({ message: e.message });
    } else if (e.name === 'DuplicateContactResourceError') {
      return res.status(409).json({ message: e.message });
    } else {
      return res.status(500).json({ message: e.message });
    }
  }
};

const getContactById = (req, res) => {
  try {
    const contact = ContactModel.find(req.params.id);
    res.status(200).json(contact);
  } catch (e) {
    if (e.name === 'ContactNotFoundError') {
      return res.status(404).json({ message: e.message });
    } else {
      return res.status(500).json({ message: e.message });
    }
  }
};

const updateContact = (req, res) => {
  try {
    ContactModel.update(req.params.id, req.body);
    res.status(303).redirect(`/contacts/${req.params.id}`);
  } catch (e) {
    if (e.name === 'ContactNotFoundError') {
      return res.status(404).json({ message: e.message });
    } else if (e.name === 'InvalidContactError') {
      return res.status(400).json({ message: e.message });
    } else if (e.name === 'InvalidContactFieldError') {
      return res.status(400).json({ message: e.message });
    } else if (e.name === 'InvalidContactSchemaError') {
      return res.status(400).json({ message: e.message });
    } else {
      return res.status(500).json({ message: e.message });
    }
  }
};

const deleteContact = (req, res) => {
  try {
    ContactModel.delete(req.params.id);
    res.status(204).send();
  } catch (e) {
    if (e.name === 'ContactNotFoundError') {
      return res.status(404).json({ message: e.message });
    } else {
      return res.status(500).json({ message: e.message });
    }
  }
};

module.exports = {
  getAllContacts,
  createContact,
  getContactById,
  updateContact,
  deleteContact
}; 