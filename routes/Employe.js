var express = require('express');
var router = express.Router();
const Employe = require('../modele/Employe');
const io = require('socket.io')();

function validateRank(req, res, next) {
    const rank = req.body.Rank;
    if (![1, 2, 3].includes(rank)) {
        return res.status(400).json({ message: 'Rank must be 1, 2, or 3' });
    }
    next();
}

router.post('/AddEmployee', validateRank, async (req, res) => {
    try {
        const { FullName, Rank, Salary } = req.body;
        const newEmploye = new Employe({ FullName, Rank, Salary });
        await newEmploye.save();
        if (Salary  > 4000) {
            io.emit('salaryAlert', { message: 'Le salaire d\'un employé a dépassé 4000 DT' });
        }
        res.status(201).json(newEmploye);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/showEmployees', async (req, res) => {
    try {
        const users = await Employe.find();
        
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/showEmployees/:id', async function(req, res, next) {
    try {
        const { id } = req.params; // Extract ID from URL parameter
    
        const employe = await Employe.findById(id);
       
        if (!employe) {
            return res.status(404).json({ error: 'Employee not found' }); 
        }
    
        res.json(employe); 
    } catch (err) {
        console.error(err);
        next(err); 
    }
});
router.get('/searchByName/:name', async function(req, res, next) {
    try {
        const { name } = req.params; 
    
        const employe = await Employe.findOne({ FullName: name });
    
        if (!employe) {
            return res.status(404).json({ error: 'Employee not found' }); 
        }
    
        res.json(employe); 
    } catch (err) {
        console.error(err);
        next(err); 
    }
});

router.put('/UpdateEmploye/:id', validateRank, async (req, res) => {
    try {
        const { FullName, Rank, Salary } = req.body;
        const updatedEmploye = await Employe.findByIdAndUpdate(req.params.id, { FullName, Rank, Salary }, { new: true });
        if (!updatedEmploye) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(updatedEmploye);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.delete('/DeleteEmploye/:id', async (req, res) => {
    try {
        const deletedEmploye = await Employe.findByIdAndDelete(req.params.id);
        if (!deletedEmploye) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.put('/augmenterSalaire/:id', async (req, res) => {
    try {
        const e = await Employe.findById(req.params.id);
        if (!e) {
            return res.status(404).json({ message: 'Employee not found' });
        }

       
        e.Salary = e.Salary * (1 + req.body.percentage / 100);
        if (e.Salary  > 4000) {
           
            io.emit('salaryAlert', { message: 'Le salaire d\'un employé a dépassé 4000 DT' });
        }
        await e.save();

        res.json({
            message: "Salary increased successfully"
        });
    } catch (error) {
        next(error); 
    }
});
router.get("/chat", (req, res, next) => {
    res.render("chat");
  });

module.exports = router;
