// src/controllers/orderController.ts
import { Request, Response } from 'express';
import { Order } from '../entities/Order';
import DataSource from '../config/db';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const orderRepository = DataSource.getRepository(Order);
    const {
      debt,
      paid,
      deliveryUserId,
      accordingTo,
      accordingToNumber,
      accordingToDate,
      warehouse,
      location,
      data,
      total,
      totalInWords,
      accompanyingDocument,
      orderIssuerId,
      deliveryPersonId,
      warehouseKeeperId,
      accountantId,
    } = req.body;
    //filter data
    const parsedData = data.map((item: any) => ({
      name: item.name,
      unit: item.unit,
      unitPrice: item.unitPrice,
      accordingTo: item.accordingTo,
      actualInput: item.actualInput,
      totalPrice: item.unitPrice * item.actualInput,
      // ... other properties
    }));

    //sum all total data
    const totalSum = parsedData.reduce((sum: number, item: any) => sum + item.totalPrice, 0);
    
    const order = new Order();
    order.debt = debt;
    order.paid = paid;
    order.deliveryUser = deliveryUserId;
    order.accordingTo = accordingTo;
    order.accordingToNumber = accordingToNumber;
    order.accordingToDate = accordingToDate;
    order.warehouse = warehouse;
    order.location = location;
    order.data = parsedData;
    order.total = totalSum;
    order.totalInWords = totalInWords;
    order.accompanyingDocument = accompanyingDocument;
    order.orderIssuer = orderIssuerId;
    order.deliveryPerson = deliveryPersonId;
    order.warehouseKeeper = warehouseKeeperId;
    order.accountant = accountantId;

    await orderRepository.save(order);

    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orderRepository = DataSource.getRepository(Order);
    const { page = 1, limit = 10 } = req.query;

    const [orders, total] = await orderRepository.findAndCount({
      take: +limit,
      skip: (+page - 1) * +limit,
    });

    res.json({ orders, total });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const orderRepository = DataSource.getRepository(Order);
    const orderId = parseInt(req.params.id);
    const {
      debt,
      paid,
      deliveryUserId,
      accordingTo,
      accordingToNumber,
      accordingToDate,
      warehouse,
      location,
      data,
      total,
      totalInWords,
      accompanyingDocument,
      orderIssuerId,
      deliveryPersonId,
      warehouseKeeperId,
      accountantId,
    } = req.body;

    const order = await orderRepository.findOneBy({ id: orderId });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Update order fields
    order.debt = debt;
    order.paid = paid;
    order.deliveryUser = deliveryUserId;
    order.accordingTo = accordingTo;
    order.accordingToNumber = accordingToNumber;
    order.accordingToDate = accordingToDate;
    order.warehouse = warehouse;
    order.location = location;
    order.data = data;
    order.total = total;
    order.totalInWords = totalInWords;
    order.accompanyingDocument = accompanyingDocument;
    order.orderIssuer = orderIssuerId;
    order.deliveryPerson = deliveryPersonId;
    order.warehouseKeeper = warehouseKeeperId;
    order.accountant = accountantId;

    const updatedOrder = await orderRepository.save(order);
    res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const orderRepository = DataSource.getRepository(Order);
    const orderId = parseInt(req.params.id);

    const order = await orderRepository.findOneBy({ id: orderId });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    await orderRepository.remove(order);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
