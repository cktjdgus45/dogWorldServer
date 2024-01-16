import express from 'express';
import 'express-async-errors';

let hospitals = [
    {
        id: '1',
        name: 'a병원',
        phone: '010-0111-1111',
        jibunAdress: '경기 화성시 동탄대로6길 15',//도로명
        // coord: {
        //     lat: 37.223313,
        //     lng: 126.952805
        // }
    },
    {
        id: '2',
        name: 'b병원',
        phone: '010-0000-2222',
        jibunAdress: '경기 화성시 동탄대로 489 동탄역 우성타워 2층',//도로명
        // coord: {
        //     lat: 37.224726,
        //     lng: 126.947334
        // }
    },
]
const router = express.Router();

//GET /address/도시명
router.get('/:city', (req, res, next) => {
    const cityName = req.params.city;
    //db.find(cityName ===cityName);
    //cityName크롤링 -> 도로명 json -> response
    if (cityName) {
        res.status(200).json(hospitals);
    } else {
        res.status(404).json({ message: `Address ${cityName} not found` });
    }
})

export default router;
