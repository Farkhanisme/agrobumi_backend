import express from "express";
import midtransClient from "midtrans-client";

const router = express.Router();

router.post("/process-transaction", (req, res) => {
  try {
    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: "SB-Mid-server-1QzEYU0XtzsuASlH0GdRm-wS",
      clientKey: "SB-Mid-client-kAcidp2Ky-4mrVCH",
    });

    const parameter = {
      transaction_details: {
        order_id: req.body.order_id,
        gross_amount: req.body.totalHarga,
      },
      item_details: [
        {
          price: req.body.totalHarga,
          quantity: req.body.jumlah,
          name: req.body.tiket,
        },
      ],
      customer_details: {
        first_name: req.body.name,
        email: req.body.email,
        tanggal: req.body.tanggal,
      },
    };

    snap.createTransaction(parameter).then((transaction) => {
      const dataPayment = {
        response: JSON.stringify(transaction),
      };
      const token = transaction.token;
      res.status(200).json({ message: "berhasil", dataPayment, token: token });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
