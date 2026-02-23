"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useQuery, useMutation, QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface VisitorLog {
  timestamp: string;
  ip: string;
  country: string;
  city?: string;
  region?: string;
  timezone?: string;
  page: string;
  path: string;
  duration?: number;
  userAgent?: string;
}

interface Stats {
  total: number;
  uniqueIPs: number;
  countries: string[];
  avgDuration: number;
  topPages: { page: string; count: number }[];
}

interface LogsResponse {
  logs: VisitorLog[];
  stats: Stats;
  period: string;
}

type ViewMode = 'period' | 'date';

const queryClient = new QueryClient();

// API 호출 함수
const fetchVisitorLogs = async (period: string): Promise<LogsResponse> => {
  const response = await fetch(`/api/get-visitor-logs?period=${period}`);
  if (!response.ok) throw new Error('Failed to fetch logs');
  return response.json();
};

// 삭제 API 호출 함수
const deleteVisitorLog = async (timestamp: string): Promise<void> => {
  const response = await fetch('/api/delete-visitor-log', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ timestamp })
  });
  if (!response.ok) throw new Error('Failed to delete log');
};

// 날짜 포맷 함수
const formatDateString = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

const getDateLabel = (date: Date): string => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const dateStr = formatDateString(date);
  const todayStr = formatDateString(today);
  const yesterdayStr = formatDateString(yesterday);

  if (dateStr === todayStr) return '오늘';
  if (dateStr === yesterdayStr) return '어제';

  return date.toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'short'
  });
};

function AdminDashboardContent() {
  const [viewMode, setViewMode] = useState<ViewMode>('period');
  const [period, setPeriod] = useState<string>('24h');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState<VisitorLog | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // 현재 쿼리 키 결정
  const queryKey = viewMode === 'period' ? period : `date:${formatDateString(selectedDate)}`;

  // React Query로 데이터 fetching + 자동 갱신
  const { data, isLoading, isFetching, dataUpdatedAt, refetch } = useQuery({
    queryKey: ['visitor-logs', queryKey],
    queryFn: () => fetchVisitorLogs(queryKey),
    refetchInterval: autoRefresh && viewMode === 'period' ? 30000 : false,
    refetchIntervalInBackground: true,
    staleTime: 10000,
  });

  // 삭제 mutation
  const deleteMutation = useMutation({
    mutationFn: deleteVisitorLog,
    onSuccess: () => {
      refetch();
      setIsModalOpen(false);
      setSelectedLog(null);
    },
  });

  const logs = data?.logs ?? [];
  const stats = data?.stats ?? null;

  // 날짜 네비게이션
  const goToPrevDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    if (newDate <= new Date()) {
      setSelectedDate(newDate);
    }
  };

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  const isToday = formatDateString(selectedDate) === formatDateString(new Date());

  const formatLastUpdated = () => {
    if (!dataUpdatedAt) return '';
    return new Date(dataUpdatedAt).toLocaleTimeString('ko-KR', {
      timeZone: 'Asia/Seoul',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('ko-KR', {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '-';
    if (seconds < 60) return `${seconds}초`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}분 ${remainingSeconds}초`;
  };

  const formatLocation = (log: VisitorLog) => {
    const parts = [];
    if (log.region) parts.push(log.region);
    if (log.city) parts.push(log.city);
    if (parts.length === 0) return log.country;
    return `${log.country} ${parts.join(' ')}`;
  };

  const openLogDetail = (log: VisitorLog) => {
    setSelectedLog(log);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLog(null);
  };

  const handleDelete = (log: VisitorLog, e?: React.MouseEvent) => {
    e?.stopPropagation();
    deleteMutation.mutate(log.timestamp);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-3 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2">방문자 로그 대시보드</h1>
              <p className="text-sm sm:text-base text-gray-400">실시간 방문자 통계 및 상세 로그</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs sm:text-sm text-gray-500 flex items-center gap-2">
                {isFetching && (
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-ping" />
                )}
                업데이트: {formatLastUpdated()}
              </span>
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  autoRefresh
                    ? 'bg-green-600/20 text-green-400 border border-green-600/50'
                    : 'bg-gray-700 text-gray-400 border border-gray-600'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${autoRefresh ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`} />
                {autoRefresh ? 'LIVE' : 'OFF'}
              </button>
              <button
                onClick={() => refetch()}
                disabled={isFetching}
                className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors disabled:opacity-50"
                title="새로고침"
              >
                <svg
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${isFetching ? 'animate-spin' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* 보기 모드 선택 */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setViewMode('period')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              viewMode === 'period'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            기간별
          </button>
          <button
            onClick={() => setViewMode('date')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              viewMode === 'date'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            날짜별
          </button>
        </div>

        {/* 필터 영역 */}
        {viewMode === 'period' ? (
          // 기간 필터
          <div className="grid grid-cols-2 sm:flex gap-2 sm:gap-3 mb-4 sm:mb-6">
            {(['24h', '1week', '1month', 'all'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 sm:px-6 py-2 rounded-lg text-sm sm:text-base font-medium transition-all ${
                  period === p
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/50'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {p === '24h' && '24시간'}
                {p === '1week' && '1주일'}
                {p === '1month' && '1개월'}
                {p === 'all' && '전체'}
              </button>
            ))}
          </div>
        ) : (
          // 날짜 네비게이션
          <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
            <button
              onClick={goToPrevDay}
              className="p-2 sm:p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
              title="이전 날짜"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex-1 text-center">
              <p className="text-lg sm:text-2xl font-bold">{getDateLabel(selectedDate)}</p>
              <p className="text-xs sm:text-sm text-gray-400">
                {selectedDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

            <button
              onClick={goToNextDay}
              disabled={isToday}
              className="p-2 sm:p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              title="다음 날짜"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {!isToday && (
              <button
                onClick={goToToday}
                className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-sm font-medium transition-colors"
              >
                오늘
              </button>
            )}
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* 통계 카드 */}
            {stats && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-6 sm:mb-8">
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-3 sm:p-6 rounded-xl shadow-lg">
                  <h3 className="text-xs sm:text-sm text-blue-100 mb-1 sm:mb-2">총 방문 수</h3>
                  <p className="text-xl sm:text-3xl font-bold">{stats.total.toLocaleString()}</p>
                </div>
                <div className="bg-gradient-to-br from-green-600 to-green-700 p-3 sm:p-6 rounded-xl shadow-lg">
                  <h3 className="text-xs sm:text-sm text-green-100 mb-1 sm:mb-2">고유 방문자</h3>
                  <p className="text-xl sm:text-3xl font-bold">{stats.uniqueIPs.toLocaleString()}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-3 sm:p-6 rounded-xl shadow-lg">
                  <h3 className="text-xs sm:text-sm text-purple-100 mb-1 sm:mb-2">평균 체류</h3>
                  <p className="text-xl sm:text-3xl font-bold">{formatDuration(stats.avgDuration)}</p>
                </div>
                <div className="bg-gradient-to-br from-orange-600 to-orange-700 p-3 sm:p-6 rounded-xl shadow-lg">
                  <h3 className="text-xs sm:text-sm text-orange-100 mb-1 sm:mb-2">방문 국가</h3>
                  <p className="text-xl sm:text-3xl font-bold">{stats.countries.length}</p>
                  <p className="text-xs text-orange-100 mt-1 hidden sm:block">{stats.countries.join(', ')}</p>
                </div>
              </div>
            )}

            {/* 인기 페이지 */}
            {stats && stats.topPages.length > 0 && (
              <div className="bg-gray-800 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-lg">
                <h2 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-4">인기 페이지 Top 10</h2>
                <div className="space-y-2 sm:space-y-3">
                  {stats.topPages.map((item, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-700 p-2 sm:p-3 rounded-lg">
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        <span className="text-lg sm:text-2xl font-bold text-gray-500 shrink-0">#{index + 1}</span>
                        <span className="text-sm sm:text-lg truncate">{item.page}</span>
                      </div>
                      <span className="bg-blue-600 px-2 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold shrink-0 ml-2">
                        {item.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 로그 테이블 */}
            <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-gray-700">
                <h2 className="text-lg sm:text-2xl font-bold">상세 로그 ({logs.length}개)</h2>
              </div>

              {/* 모바일: 카드 리스트 */}
              <div className="sm:hidden divide-y divide-gray-700">
                {logs.length === 0 ? (
                  <div className="px-4 py-8 text-center text-gray-400">
                    로그가 없습니다
                  </div>
                ) : (
                  logs.map((log, index) => (
                    <div
                      key={`${log.timestamp}-${index}`}
                      className="p-4 hover:bg-gray-750 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-medium truncate flex-1 mr-2">{log.page}</span>
                        <span className="bg-gray-700 px-2 py-0.5 rounded text-xs shrink-0">
                          {formatLocation(log)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-gray-400 mb-2">
                        <span>{formatDate(log.timestamp).split(' ').slice(1).join(' ')}</span>
                        <span>{formatDuration(log.duration)}</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => openLogDetail(log)}
                          className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-500 rounded text-xs font-medium transition-colors"
                        >
                          보기
                        </button>
                        <button
                          onClick={(e) => handleDelete(log, e)}
                          disabled={deleteMutation.isPending}
                          className="flex-1 py-1.5 bg-red-600 hover:bg-red-500 rounded text-xs font-medium transition-colors disabled:opacity-50"
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* 데스크탑: 테이블 */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        시간
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        페이지
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        위치
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        체류시간
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        관리
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {logs.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                          로그가 없습니다
                        </td>
                      </tr>
                    ) : (
                      logs.map((log, index) => (
                        <tr key={`${log.timestamp}-${index}`} className="hover:bg-gray-750 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {formatDate(log.timestamp)}
                          </td>
                          <td className="px-6 py-4 text-sm">{log.page}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className="bg-gray-700 px-2 py-1 rounded">
                              {formatLocation(log)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {formatDuration(log.duration)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex gap-2">
                              <button
                                onClick={() => openLogDetail(log)}
                                className="text-blue-400 hover:text-blue-300 font-medium"
                              >
                                보기
                              </button>
                              <button
                                onClick={(e) => handleDelete(log, e)}
                                disabled={deleteMutation.isPending}
                                className="text-red-400 hover:text-red-300 font-medium disabled:opacity-50"
                              >
                                삭제
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>

      {/* 상세 모달 */}
      <AnimatePresence>
        {isModalOpen && selectedLog && (
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm sm:p-4"
            onClick={closeModal}
          >
            <motion.div
              key="modal-content"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="bg-gray-800 rounded-t-2xl sm:rounded-xl shadow-2xl max-w-2xl w-full p-4 sm:p-6 max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl font-bold">로그 상세 정보</h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-200 transition-colors p-1"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="text-xs sm:text-sm text-gray-400">시간</label>
                  <p className="text-base sm:text-lg">{formatDate(selectedLog.timestamp)}</p>
                </div>
                <div>
                  <label className="text-xs sm:text-sm text-gray-400">페이지</label>
                  <p className="text-base sm:text-lg">{selectedLog.page}</p>
                </div>
                <div>
                  <label className="text-xs sm:text-sm text-gray-400">전체 경로</label>
                  <p className="text-sm sm:text-lg font-mono bg-gray-700 p-2 rounded break-all">{selectedLog.path}</p>
                </div>

                {/* 위치 정보 */}
                <div className="bg-gray-700 p-3 sm:p-4 rounded-lg">
                  <label className="text-xs sm:text-sm text-gray-400 block mb-2">위치 정보</label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-gray-500">국가</p>
                      <p className="text-sm sm:text-base font-medium">{selectedLog.country}</p>
                    </div>
                    {selectedLog.region && (
                      <div>
                        <p className="text-xs text-gray-500">지역</p>
                        <p className="text-sm sm:text-base font-medium">{selectedLog.region}</p>
                      </div>
                    )}
                    {selectedLog.city && (
                      <div>
                        <p className="text-xs text-gray-500">도시</p>
                        <p className="text-sm sm:text-base font-medium">{selectedLog.city}</p>
                      </div>
                    )}
                    {selectedLog.timezone && (
                      <div>
                        <p className="text-xs text-gray-500">시간대</p>
                        <p className="text-sm sm:text-base font-medium">{selectedLog.timezone}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="text-xs sm:text-sm text-gray-400">IP 주소</label>
                    <p className="text-sm sm:text-lg font-mono break-all">{selectedLog.ip}</p>
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm text-gray-400">체류시간</label>
                    <p className="text-base sm:text-lg">{formatDuration(selectedLog.duration)}</p>
                  </div>
                </div>

                {selectedLog.userAgent && (
                  <div>
                    <label className="text-xs sm:text-sm text-gray-400">User Agent</label>
                    <p className="text-xs sm:text-sm bg-gray-700 p-2 sm:p-3 rounded break-all">
                      {selectedLog.userAgent}
                    </p>
                  </div>
                )}

                {/* 모달 내 삭제 버튼 */}
                <div className="pt-4 border-t border-gray-700">
                  <button
                    onClick={() => handleDelete(selectedLog)}
                    disabled={deleteMutation.isPending}
                    className="w-full py-3 bg-red-600 hover:bg-red-500 rounded-lg font-medium transition-colors disabled:opacity-50"
                  >
                    {deleteMutation.isPending ? '삭제 중...' : '이 로그 삭제하기'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// QueryClientProvider로 감싸기
export default function AdminDashboard() {
  return (
    <QueryClientProvider client={queryClient}>
      <AdminDashboardContent />
    </QueryClientProvider>
  );
}
