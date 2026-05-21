import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import { Bell, ChevronDown, Menu } from 'lucide-react';
import { Screen, Tank } from '../App';
import {
  MobileScreen,
  PrimaryButton,
  SecondaryButton,
  SurfaceCard,
} from './mobile-ui';

interface DashboardScreenProps {
  tanks: Tank[];
  onNavigate: (screen: Screen) => void;
}

const statusMeta = {
  ok: {
    label: 'OK',
    badgeClass: 'bg-[#2ccc74] text-[#0e351e]',
    chartColor: '#1ea85b',
  },
  warning: {
    label: 'Atencao',
    badgeClass: 'bg-[#f1c432] text-[#4a3400]',
    chartColor: '#f0b514',
  },
  critical: {
    label: 'Critico',
    badgeClass: 'bg-[#ff3737] text-white',
    chartColor: '#ff3333',
  },
} satisfies Record<Tank['status'], { label: string; badgeClass: string; chartColor: string }>;

export default function DashboardScreen({ tanks, onNavigate }: DashboardScreenProps) {
  const [expandedTankId, setExpandedTankId] = useState(
    () => tanks.find((tank) => tank.status !== 'ok')?.id ?? tanks[0]?.id ?? '',
  );

  useEffect(() => {
    if (!tanks.some((tank) => tank.id === expandedTankId)) {
      setExpandedTankId(tanks.find((tank) => tank.status !== 'ok')?.id ?? tanks[0]?.id ?? '');
    }
  }, [expandedTankId, tanks]);

  const alertCount = tanks.filter((tank) => tank.status !== 'ok').length;

  return (
    <MobileScreen contentClassName="px-4 pb-8">
      <motion.div
        className="flex items-center justify-between px-2 pt-1"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <button
          onClick={() => onNavigate('profile')}
          className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#1d2538] shadow-[0_12px_24px_rgba(34,76,178,0.12)]"
        >
          <Menu className="h-5 w-5" />
        </button>

        <button className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#1d2538] shadow-[0_12px_24px_rgba(34,76,178,0.12)]">
          <Bell className="h-5 w-5" />
          {alertCount > 0 ? (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#ff2c2c] px-1 text-[10px] font-bold text-white">
              {alertCount}
            </span>
          ) : null}
        </button>
      </motion.div>

      <div className="mt-5 space-y-4">
        {tanks.map((tank, index) => {
          const expanded = expandedTankId === tank.id;
          const meta = statusMeta[tank.status];

          return (
            <motion.div
              key={tank.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <SurfaceCard className="overflow-hidden px-4 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[16px] font-extrabold text-[#1d2538]">{tank.name}</p>
                    <p className="mt-1 text-[12px] font-medium text-[#74819d]">
                      {tank.fishType}
                    </p>
                  </div>

                  <span
                    className={[
                      'rounded-[10px] px-3 py-2 text-[11px] font-extrabold uppercase tracking-[0.08em]',
                      meta.badgeClass,
                    ].join(' ')}
                  >
                    {meta.label}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-[1fr_auto_1fr_auto] items-start gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#52617d]">
                      Temperatura
                    </p>
                    <p className="mt-1 text-[25px] font-extrabold text-[#1d2538]">
                      {tank.temperature.toFixed(1)}
                      <span className="ml-1 text-[12px] font-semibold text-[#677794]">°C</span>
                    </p>
                  </div>

                  <div className="mt-1 h-10 w-px bg-[#dbe4f4]" />

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#52617d]">
                      Oxigenio
                    </p>
                    <p className="mt-1 text-[25px] font-extrabold text-[#1d2538]">
                      {tank.oxygen.toFixed(1)}
                      <span className="ml-1 text-[12px] font-semibold text-[#677794]">
                        mg/L
                      </span>
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      setExpandedTankId(expanded ? '' : tank.id)
                    }
                    className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-[#edf3ff] text-[#1d56cf]"
                    aria-label={expanded ? 'Recolher grafico' : 'Expandir grafico'}
                  >
                    <ChevronDown
                      className={[
                        'h-4 w-4 transition-transform duration-200',
                        expanded ? 'rotate-180' : '',
                      ].join(' ')}
                    />
                  </button>
                </div>

                <AnimatePresence initial={false}>
                  {expanded ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.28, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="rounded-[18px] border border-[#dbe4f4] bg-[#fbfdff] p-3">
                        <div className="mb-2 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5e6d88]">
                          <span>Ultimas leituras</span>
                          <span>{tank.history[tank.history.length - 1]?.time}</span>
                        </div>

                        <div className="h-[132px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={tank.history}>
                              <CartesianGrid stroke="#e7edf8" strokeDasharray="3 3" />
                              <XAxis
                                dataKey="time"
                                tick={{ fontSize: 9, fill: '#667892' }}
                                axisLine={false}
                                tickLine={false}
                              />
                              <YAxis
                                tick={{ fontSize: 9, fill: '#667892' }}
                                axisLine={false}
                                tickLine={false}
                                width={28}
                              />
                              <Line
                                type="monotone"
                                dataKey="temp"
                                stroke={meta.chartColor}
                                strokeWidth={2.5}
                                dot={{ r: 0 }}
                                activeDot={{ r: 5 }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </SurfaceCard>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        className="mt-6 space-y-3 px-2"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18 }}
      >
        <PrimaryButton onClick={() => onNavigate('addTank')}>
          Adicionar Tanque
        </PrimaryButton>
        <SecondaryButton onClick={() => onNavigate('registerReading')}>
          Registrar leitura
        </SecondaryButton>
      </motion.div>
    </MobileScreen>
  );
}
