import React from 'react';
import Link from 'next/link';

const StatsDisplay = ({ stats }) => {
  return (
    <section className="stats-display container my-5">
      <div className="row text-center">
        {stats.map((item) => (
          <div key={item.label} className="col-6 col-md-3 mb-4">
            <Link href={`/${item.label.toLowerCase()}`} legacyBehavior>
              <a className="text-decoration-none">
                <div className="stat-card p-4 rounded shadow-sm">
                  <h2 className="stat-number">{item.count}</h2>
                  <p className="stat-label">{item.label}</p>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsDisplay;
