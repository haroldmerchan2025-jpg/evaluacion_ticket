import express, { Request, Response } from "express";
import tickets from "./data/data.ticket.json" with { type: "json" };

const app = express();

app.use(express.json());

app.get("/api/tickets", (req: Request, res: Response) => {
  const { resolved } = req.query;

  if (resolved === "true") {
    const resueltos = tickets.filter((t) => t.resolved === true);
    return res.status(200).json({
      success: true,
      data: resueltos,
      total: resueltos.length,
    });
  }

  if (resolved === "false") {
    const pendientes = tickets.filter((t) => t.resolved === false);
    return res.status(200).json({
      success: true,
      data: pendientes,
      total: pendientes.length,
    });
  }

  res.status(200).json({
    success: true,
    data: tickets,
    total: tickets.length,
  });
});

app.get("/api/tickets/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const ticket = tickets.find((t) => t.id === id);

  if (!ticket) {
    return res.status(404).json({
      success: false,
      message: "Ticket no encontrado",
    });
  }

  res.status(200).json({
    success: true,
    data: ticket,
  });
});

app.get("/api/tickets/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id) || !Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      message: "El ID debe ser un entero positivo",
    });
  }

  const ticket = tickets.find((t) => t.id === id);

  if (!ticket) {
    return res.status(404).json({
      success: false,
      message: "Ticket no encontrado",
    });
  }

  res.status(200).json({
    success: true,
    data: ticket,
  });
});

app.post("/api/tickets", (req: Request, res: Response) => {
  const { title, description, priority, resolved } = req.body;

  const newId = tickets.length > 0 ? Math.max(...tickets.map((t) => t.id)) + 1 : 1;

  const newTicket = {
    id: newId,
    title,
    description,
    priority,
    resolved,
  };

  tickets.push(newTicket);

  res.status(201).json({
    success: true,
    data: newTicket,
  });
});

app.post("/api/tickets", (req: Request, res: Response) => {
  const { title, description, priority, resolved } = req.body;

  const newId = tickets.length > 0 ? Math.max(...tickets.map((t) => t.id)) + 1 : 1;

  const newTicket = {
    id: newId,
    title,
    description,
    priority,
    resolved,
  };

  tickets.push(newTicket);

  res.status(201).json({
    success: true,
    message: "Ticket creado correctamente",
    data: newTicket,
  });
});

export default app;