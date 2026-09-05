"use client";

import { useState } from "react";
import CartPanel from "@/components/CartPanel";
import CheckoutForm from "@/components/CheckoutForm";
import OrderStatusPanel from "@/components/OrderStatusPanel";
import ProductCatalog from "@/components/ProductCatalog";
import { formatCOP } from "@/lib/format";
import { PRODUCTS } from "@/lib/products";
import { Order } from "@/lib/types";
import { PedidoContext } from "@/patterns/state/PedidoContext";

type View = "shop" | "checkout" | "confirmation";

export default function Home() {
  const [view, setView] = useState<View>("shop");
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [confirmedTotal, setConfirmedTotal] = useState(0);
  const [pedidoContext, setPedidoContext] = useState<PedidoContext | null>(null);

  function handleConfirmed(order: Order, total: number) {
    setConfirmedOrder(order);
    setConfirmedTotal(total);
    setPedidoContext(new PedidoContext());
    setView("confirmation");
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <h1 className="text-xl font-semibold">🏫 Tienda de Patrones</h1>
          <div className="flex items-center gap-4 text-sm">
            <a
              href="/actividades.html"
              target="_blank"
              rel="noopener"
              className="underline hover:text-neutral-900"
            >
              Actividades
            </a>
            <a
              href="/conexiones.html"
              target="_blank"
              rel="noopener"
              className="underline hover:text-neutral-900"
            >
              Conexiones (ronda 2)
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        {view === "shop" && (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ProductCatalog products={PRODUCTS} />
            </div>
            <div>
              <CartPanel onCheckout={() => setView("checkout")} />
            </div>
          </div>
        )}

        {view === "checkout" && (
          <CheckoutForm onConfirmed={handleConfirmed} onBack={() => setView("shop")} />
        )}

        {view === "confirmation" && confirmedOrder && pedidoContext && (
          <div className="mx-auto max-w-md space-y-6">
            <div className="rounded-lg border border-neutral-200 bg-white p-6 text-center">
              <div className="mb-2 text-4xl">✅</div>
              <h2 className="mb-1 text-lg font-semibold">¡Pedido confirmado!</h2>
              <p className="text-sm text-neutral-500">
                Pedido {confirmedOrder.id} — Total {formatCOP(confirmedTotal)}
              </p>
            </div>

            <OrderStatusPanel pedido={pedidoContext} />

            <button
              onClick={() => setView("shop")}
              className="w-full rounded border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-100"
            >
              Volver a la tienda
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
