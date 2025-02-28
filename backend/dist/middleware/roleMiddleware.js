"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleMiddleware = void 0;
const roleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        // Check if the user's role is in the list of allowed roles
        if (!allowedRoles.includes(req.user.role)) {
            res.status(403).json({ message: 'Forbidden' });
            return;
        }
        next();
    };
};
exports.roleMiddleware = roleMiddleware;
