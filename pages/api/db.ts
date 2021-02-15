import { NextApiRequest, NextApiResponse } from "next";
import db from '../../db.json';

export default function dbHandler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  res.json(db.products)
}