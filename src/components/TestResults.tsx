import React from 'react';
import { motion } from 'framer-motion';

interface TestResultsProps {
  results: {
    passed: number;
    failed: number;
    skipped: number;
    total: number;
  };
  issues: Array<{
    id: string;
    component: string;
    description: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    status: 'open' | 'in-progress' | 'resolved';
  }>;
}

const TestResults: React.FC<TestResultsProps> = ({ results, issues }) => {
  // Calculate percentages
  const passedPercentage = Math.round((results.passed / results.total) * 100);
  const failedPercentage = Math.round((results.failed / results.total) * 100);
  const skippedPercentage = Math.round((results.skipped / results.total) * 100);
  
  // Severity colors
  const severityColors = {
    'low': 'bg-blue-100 text-blue-800',
    'medium': 'bg-yellow-100 text-yellow-800',
    'high': 'bg-orange-100 text-orange-800',
    'critical': 'bg-red-100 text-red-800'
  };
  
  // Status colors
  const statusColors = {
    'open': 'bg-red-100 text-red-800',
    'in-progress': 'bg-yellow-100 text-yellow-800',
    'resolved': 'bg-green-100 text-green-800'
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-blue text-white p-6">
        <h2 className="text-2xl font-bold mb-2">Резултати от тестването</h2>
        <p className="text-blue-100">
          Обобщение на проведените тестове и открити проблеми
        </p>
      </div>
      
      {/* Test Summary */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-light-gray rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-primary-dark mb-1">{results.total}</div>
            <div className="text-dark-gray">Общо тестове</div>
          </div>
          
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">{results.passed}</div>
            <div className="text-green-800">Успешни ({passedPercentage}%)</div>
          </div>
          
          <div className="bg-red-50 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">{results.failed}</div>
            <div className="text-red-800">Неуспешни ({failedPercentage}%)</div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-gray-500 mb-1">{results.skipped}</div>
            <div className="text-gray-700">Пропуснати ({skippedPercentage}%)</div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="h-4 bg-gray-200 rounded-full overflow-hidden mb-6">
          <div className="flex h-full">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${passedPercentage}%` }}
              transition={{ duration: 1 }}
              className="bg-green-500 h-full"
            />
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${failedPercentage}%` }}
              transition={{ duration: 1 }}
              className="bg-red-500 h-full"
            />
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${skippedPercentage}%` }}
              transition={{ duration: 1 }}
              className="bg-gray-400 h-full"
            />
          </div>
        </div>
        
        {/* Issues Table */}
        <h3 className="text-xl font-bold mb-4 text-primary-dark">Открити проблеми</h3>
        
        {issues.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Компонент
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Описание
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Сериозност
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Статус
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {issues.map((issue) => (
                  <tr key={issue.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {issue.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {issue.component}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {issue.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${severityColors[issue.severity]}`}>
                        {issue.severity === 'low' && 'Ниска'}
                        {issue.severity === 'medium' && 'Средна'}
                        {issue.severity === 'high' && 'Висока'}
                        {issue.severity === 'critical' && 'Критична'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${statusColors[issue.status]}`}>
                        {issue.status === 'open' && 'Отворен'}
                        {issue.status === 'in-progress' && 'В процес'}
                        {issue.status === 'resolved' && 'Решен'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 bg-green-50 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h4 className="text-lg font-bold text-green-800 mb-2">Няма открити проблеми!</h4>
            <p className="text-green-600">Всички тестове са преминали успешно.</p>
          </div>
        )}
        
        {/* Recommendations */}
        {issues.length > 0 && (
          <div className="mt-8 p-6 bg-light-gray rounded-xl">
            <h4 className="text-lg font-bold mb-4">Препоръки за подобрение</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span>Приоритизирайте решаването на проблеми с висока и критична сериозност.</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span>Проведете допълнително тестване на мобилни устройства за проблеми с отзивчивостта.</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span>Оптимизирайте производителността на анимациите за по-слаби устройства.</span>
              </li>
            </ul>
          </div>
        )}
        
        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Изтеглете пълния доклад
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Стартирайте нов тест
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default TestResults;
