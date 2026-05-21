import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import LoginScreen from './components/LoginScreen';
import LoadingScreen from './components/LoadingScreen';
import PersonalDataScreen from './components/PersonalDataScreen';
import DashboardScreen from './components/DashboardScreen';
import AddTankScreen from './components/AddTankScreen';
import RegisterReadingScreen from './components/RegisterReadingScreen';
import ProfileScreen from './components/ProfileScreen';

export type Screen =
  | 'login'
  | 'loading'
  | 'personalData'
  | 'dashboard'
  | 'addTank'
  | 'registerReading'
  | 'profile';

export interface Tank {
  id: string;
  name: string;
  fishType: string;
  temperature: number;
  oxygen: number;
  status: 'ok' | 'warning' | 'critical';
  tempMin: number;
  tempMax: number;
  oxygenMin: number;
  oxygenMax: number;
  history: { time: string; temp: number; oxygen: number }[];
}

const initialTanks: Tank[] = [
  {
    id: '1',
    name: 'Tanque 01',
    fishType: 'Tilapia',
    temperature: 26.5,
    oxygen: 6.2,
    status: 'ok',
    tempMin: 24,
    tempMax: 30,
    oxygenMin: 5,
    oxygenMax: 8,
    history: [
      { time: '09:00', temp: 24.1, oxygen: 5.7 },
      { time: '10:00', temp: 25.4, oxygen: 5.9 },
      { time: '11:00', temp: 26.1, oxygen: 6.0 },
      { time: '12:00', temp: 25.2, oxygen: 6.1 },
      { time: '13:00', temp: 26.5, oxygen: 6.2 },
    ],
  },
  {
    id: '2',
    name: 'Tanque 02',
    fishType: 'Tambaqui',
    temperature: 20.5,
    oxygen: 6.2,
    status: 'warning',
    tempMin: 22,
    tempMax: 28,
    oxygenMin: 5.5,
    oxygenMax: 7.5,
    history: [
      { time: '09:00', temp: 17.0, oxygen: 5.8 },
      { time: '10:00', temp: 22.6, oxygen: 6.0 },
      { time: '11:00', temp: 23.8, oxygen: 6.2 },
      { time: '12:00', temp: 24.5, oxygen: 6.3 },
      { time: '13:00', temp: 20.5, oxygen: 6.2 },
    ],
  },
  {
    id: '3',
    name: 'Tanque 03',
    fishType: 'Pacu',
    temperature: 29.8,
    oxygen: 4.4,
    status: 'critical',
    tempMin: 24,
    tempMax: 27,
    oxygenMin: 5.2,
    oxygenMax: 7,
    history: [
      { time: '09:00', temp: 27.2, oxygen: 5.2 },
      { time: '10:00', temp: 28.0, oxygen: 4.9 },
      { time: '11:00', temp: 28.6, oxygen: 4.8 },
      { time: '12:00', temp: 29.2, oxygen: 4.6 },
      { time: '13:00', temp: 29.8, oxygen: 4.4 },
    ],
  },
];

function getTankStatus(tank: Tank, temperature: number, oxygen: number): Tank['status'] {
  const severeTempGap = temperature < tank.tempMin - 2 || temperature > tank.tempMax + 2;
  const severeOxygenGap = oxygen < tank.oxygenMin - 1 || oxygen > tank.oxygenMax + 1;
  const outsideSafeRange =
    temperature < tank.tempMin ||
    temperature > tank.tempMax ||
    oxygen < tank.oxygenMin ||
    oxygen > tank.oxygenMax;

  if (severeTempGap || severeOxygenGap) {
    return 'critical';
  }

  if (outsideSafeRange) {
    return 'warning';
  }

  return 'ok';
}

function buildInitialHistory(temperature: number, oxygen: number) {
  return [
    { time: '09:00', temp: temperature - 1.2, oxygen: oxygen - 0.4 },
    { time: '10:00', temp: temperature - 0.8, oxygen: oxygen - 0.2 },
    { time: '11:00', temp: temperature - 0.4, oxygen: oxygen - 0.1 },
    { time: '12:00', temp: temperature - 0.2, oxygen },
  ];
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [tanks, setTanks] = useState<Tank[]>(initialTanks);

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const addTank = (tank: Tank) => {
    setTanks((currentTanks) => [...currentTanks, tank]);
  };

  const updateTankReading = (tankId: string, temperature: number, oxygen: number) => {
    setTanks((currentTanks) =>
      currentTanks.map((tank) => {
        if (tank.id !== tankId) {
          return tank;
        }

        return {
          ...tank,
          temperature,
          oxygen,
          status: getTankStatus(tank, temperature, oxygen),
          history: [
            ...(tank.history.length ? tank.history : buildInitialHistory(temperature, oxygen)),
            {
              time: new Date().toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
              }),
              temp: temperature,
              oxygen,
            },
          ].slice(-6),
        };
      }),
    );
  };

  const pageVariants = {
    initial: { opacity: 0, x: 26 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -26 },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.35,
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <AnimatePresence mode="wait">
        {currentScreen === 'login' && (
          <motion.div
            key="login"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <LoginScreen onNavigate={navigateTo} />
          </motion.div>
        )}

        {currentScreen === 'loading' && (
          <motion.div
            key="loading"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <LoadingScreen onNavigate={navigateTo} />
          </motion.div>
        )}

        {currentScreen === 'personalData' && (
          <motion.div
            key="personalData"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <PersonalDataScreen onNavigate={navigateTo} />
          </motion.div>
        )}

        {currentScreen === 'dashboard' && (
          <motion.div
            key="dashboard"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <DashboardScreen tanks={tanks} onNavigate={navigateTo} />
          </motion.div>
        )}

        {currentScreen === 'addTank' && (
          <motion.div
            key="addTank"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <AddTankScreen onNavigate={navigateTo} onAddTank={addTank} />
          </motion.div>
        )}

        {currentScreen === 'registerReading' && (
          <motion.div
            key="registerReading"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <RegisterReadingScreen
              tanks={tanks}
              onNavigate={navigateTo}
              onUpdateReading={updateTankReading}
            />
          </motion.div>
        )}

        {currentScreen === 'profile' && (
          <motion.div
            key="profile"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <ProfileScreen tanks={tanks} onNavigate={navigateTo} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
