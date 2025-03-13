import {catchAsync} from '../../../utils/CatchAsync.js';
import * as coachService from '../Service/coachService.js';

export const coachregister = catchAsync(async (req, res, next) => {
    const token = await coachService.coachregister(req.body);
    return res.status(201).json({
        success: true,
        message: "done",
        token
    });
});

export const coachlogin = catchAsync(async (req, res, next) => {
    const token = await coachService.coachlogin(req.body.email, req.body.password);
    return res.status(200).json({
        success: true,
        message: "done",
        token
    });
});