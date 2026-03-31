'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend
);

/* ── Data ──────────────────────────────────────────────── */

const jahre = [
  2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012,
  2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
  2023, 2024,
];

const kschk = [
  345000, 311000, 268000, 232000, 200000, 210000, 290000, 260000,
  240000, 220000, 215000, 200000, 195000, 190000, 188000, 185000,
  178797, 198766, 170000, 144678, 148000, 162000,
];

const gesamt = [
  630000, 600000, 530000, 468000, 460000, 480000, 560000, 530000,
  510000, 490000, 480000, 460000, 450000, 440000, 430000, 425000,
  426108, 332407, 380000, 350000, 358000, 375000,
];

/* ── 1) Line Chart: Jahresübersicht ─────────────────── */

export function JahresuebersichtChart() {
  return (
    <div className="w-full" style={{ position: 'relative', height: 'auto' }}>
      <Line
        data={{
          labels: jahre.map(String),
          datasets: [
            {
              label: 'Kündigungsschutzklagen',
              data: kschk,
              borderColor: '#1a56db',
              backgroundColor: 'rgba(26,86,219,0.08)',
              fill: true,
              tension: 0.3,
              pointRadius: 3,
              pointHoverRadius: 5,
              borderWidth: 2,
            },
            {
              label: 'Gesamteingänge ArbG',
              data: gesamt,
              borderColor: '#9ca3af',
              borderDash: [6, 4],
              backgroundColor: 'transparent',
              fill: false,
              tension: 0.3,
              pointRadius: 2,
              pointHoverRadius: 4,
              borderWidth: 2,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: 2.2,
          interaction: { mode: 'index', intersect: false },
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                padding: 20,
                usePointStyle: true,
                font: { size: 13 },
              },
            },
            tooltip: {
              callbacks: {
                label(ctx) {
                  const v = ctx.parsed.y ?? 0;
                  return `${ctx.dataset.label}: ${v.toLocaleString('de-DE')}`;
                },
              },
            },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { font: { size: 11 }, maxRotation: 45 },
            },
            y: {
              beginAtZero: false,
              ticks: {
                font: { size: 11 },
                callback(value) {
                  return `${(Number(value) / 1000).toFixed(0)}k`;
                },
              },
              grid: { color: 'rgba(0,0,0,0.05)' },
            },
          },
        }}
      />
    </div>
  );
}

/* ── 2) Donut Chart: Erledigungsarten ───────────────── */

export function ErledigungsartenChart() {
  return (
    <div className="mx-auto" style={{ maxWidth: 360 }}>
      <Doughnut
        data={{
          labels: ['Vergleich', 'Klagerücknahme', 'Streitiges Urteil', 'Sonstige'],
          datasets: [
            {
              data: [81, 12, 7, 5],
              backgroundColor: ['#1a56db', '#93b8f4', '#c97316', '#d1d5db'],
              borderWidth: 2,
              borderColor: '#fff',
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          cutout: '55%',
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                padding: 16,
                usePointStyle: true,
                font: { size: 13 },
              },
            },
            tooltip: {
              callbacks: {
                label(ctx) {
                  return `${ctx.label}: ${ctx.parsed} %`;
                },
              },
            },
          },
        }}
      />
    </div>
  );
}

/* ── 3) Horizontal Bar: Bundesländer ────────────────── */

const blData = [
  { name: 'Nordrhein-Westfalen', wert: 38200 },
  { name: 'Bayern', wert: 22100 },
  { name: 'Baden-Württemberg', wert: 18600 },
  { name: 'Niedersachsen', wert: 13400 },
  { name: 'Hessen', wert: 12800 },
  { name: 'Berlin', wert: 10500 },
  { name: 'Sachsen', wert: 6200 },
  { name: 'Hamburg', wert: 5800 },
  { name: 'Rheinland-Pfalz', wert: 5400 },
  { name: 'Schleswig-Holstein', wert: 4600 },
  { name: 'Thüringen', wert: 3200 },
  { name: 'Brandenburg', wert: 3100 },
  { name: 'Sachsen-Anhalt', wert: 2900 },
  { name: 'Mecklenburg-Vorp.', wert: 1900 },
  { name: 'Saarland', wert: 1700 },
  { name: 'Bremen', wert: 1400 },
];

export function BundeslaenderChart() {
  return (
    <div className="w-full" style={{ position: 'relative', height: 'auto' }}>
      <Bar
        data={{
          labels: blData.map((d) => d.name),
          datasets: [
            {
              label: 'Eingänge KSchK 2022/23',
              data: blData.map((d) => d.wert),
              backgroundColor: '#1a56db',
              borderRadius: 3,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: 1.1,
          indexAxis: 'y',
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label(ctx) {
                  const v = ctx.parsed.x ?? 0;
                  return `${v.toLocaleString('de-DE')} Klagen`;
                },
              },
            },
          },
          scales: {
            x: {
              beginAtZero: true,
              ticks: {
                font: { size: 11 },
                callback(value) {
                  return `${(Number(value) / 1000).toFixed(0)}k`;
                },
              },
              grid: { color: 'rgba(0,0,0,0.05)' },
            },
            y: {
              grid: { display: false },
              ticks: { font: { size: 12 } },
            },
          },
        }}
      />
    </div>
  );
}

/* ── 4) Grouped Bar: BAG-Revisionen ─────────────────── */

const bagJahre = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
const bagRevisionen = [927, 964, 850, 820, 780, 700, 541, 399, 330, 352];
const bagNZB = [1271, 1282, 1200, 1100, 1050, 950, 909, 801, 975, 874];

export function BAGChart() {
  return (
    <div className="w-full" style={{ position: 'relative', height: 'auto' }}>
      <Bar
        data={{
          labels: bagJahre.map(String),
          datasets: [
            {
              label: 'Revisionen',
              data: bagRevisionen,
              backgroundColor: '#1a56db',
              borderRadius: 3,
            },
            {
              label: 'Nichtzulassungsbeschwerden',
              data: bagNZB,
              backgroundColor: '#c97316',
              borderRadius: 3,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: 2,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                padding: 20,
                usePointStyle: true,
                font: { size: 13 },
              },
            },
            tooltip: {
              callbacks: {
                label(ctx) {
                  const v = ctx.parsed.y ?? 0;
                  return `${ctx.dataset.label}: ${v.toLocaleString('de-DE')}`;
                },
              },
            },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { font: { size: 11 } },
            },
            y: {
              beginAtZero: true,
              ticks: { font: { size: 11 } },
              grid: { color: 'rgba(0,0,0,0.05)' },
            },
          },
        }}
      />
    </div>
  );
}
