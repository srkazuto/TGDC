import { Request, Response, NextFunction } from 'express';

export const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Body:', req.body);

  // Solo mostrar info del usuario si existe la sesión
  if (req.session && req.session.user) {
    console.log('Usuario logueado:', req.session.user);
  } else {
    console.log('No hay usuario logueado');
  }

  next();
};
