import React, { useState } from "react";
import {
  startOfWeek,
  addDays,
  parseISO,
  format,
  differenceInCalendarDays,
  isWithinInterval,
} from "date-fns";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { Button } from "./ui/button";

/** 이벤트(계획) 데이터 구조 예시 */
interface CalendarEvent {
  id: string;
  title: string;
  start: string; // "YYYY-MM-DD"
  end: string; // "YYYY-MM-DD"
}

/**
 * 지정 연/월 달력을 2차원 배열로 생성하는 함수
 * (각 셀에 해당하는 Date 객체를 담음)
 */
function getCalendarMatrix(year: number, month: number) {
  // month는 1~12 범위라 가정. JavaScript Date는 0~11 범위 사용
  const firstDayOfMonth = new Date(year, month - 1, 1);

  // 이번 달 1일을 포함하는 "주"의 시작(일요일 기준)
  const start = startOfWeek(firstDayOfMonth, { weekStartsOn: 0 });

  // 실제로 최대 6주 정도 보이도록 6행 * 7열 배열 생성
  const matrix: Date[][] = [];
  let currentDay = start;

  for (let w = 0; w < 6; w++) {
    const weekRow: Date[] = [];
    for (let d = 0; d < 7; d++) {
      weekRow.push(currentDay);
      currentDay = addDays(currentDay, 1);
    }
    matrix.push(weekRow);
  }

  return matrix;
}

/** 이벤트가 특정 날짜에 걸쳐 있는지 판별 */
function isEventOnDate(event: CalendarEvent, date: Date) {
  // date-fns isWithinInterval을 사용
  return isWithinInterval(date, {
    start: parseISO(event.start),
    end: parseISO(event.end),
  });
}

/** 메인 컴포넌트 */
export default function CalendarArea() {
  // 연도/월 (기본값은 현재 날짜, 여기서는 2025년 2월로 테스트 예시)
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(2);

  // 이벤트(계획) 리스트
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: "1",
      title: "event1",
      start: "2025-02-04",
      end: "2025-02-05",
    },
  ]);

  // 모달 open 여부 & 편집 대상 이벤트
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);

  // 달력용 데이터
  const calendarMatrix = getCalendarMatrix(year, month);

  // 이전 달 / 다음 달 이동
  const goPrevMonth = () => {
    const newDate = new Date(year, month - 1, 1);
    newDate.setMonth(newDate.getMonth() - 1);
    setYear(newDate.getFullYear());
    setMonth(newDate.getMonth() + 1);
  };

  const goNextMonth = () => {
    const newDate = new Date(year, month - 1, 1);
    newDate.setMonth(newDate.getMonth() + 1);
    setYear(newDate.getFullYear());
    setMonth(newDate.getMonth() + 1);
  };

  // 날짜 셀 클릭 -> 새 이벤트 생성 모달
  const handleCellClick = (date: Date) => {
    setEditingEvent({
      id: "",
      title: "",
      start: format(date, "yyyy-MM-dd"),
      end: format(date, "yyyy-MM-dd"),
    });
    setModalOpen(true);
  };

  // 이벤트 블록 클릭 -> 편집 모달
  const handleEventClick = (event: CalendarEvent) => {
    setEditingEvent(event);
    setModalOpen(true);
  };

  // 이벤트 저장 (신규 or 수정)
  const handleSaveEvent = (updatedEvent: CalendarEvent) => {
    if (updatedEvent.id) {
      // 이미 존재하는 이벤트 수정
      setEvents((prev) =>
        prev.map((ev) => (ev.id === updatedEvent.id ? updatedEvent : ev))
      );
    } else {
      // 신규 이벤트 (임시 id 생성)
      const newEvent = { ...updatedEvent, id: String(Date.now()) };
      setEvents((prev) => [...prev, newEvent]);
    }
    setModalOpen(false);
    setEditingEvent(null);
  };

  // 이벤트 삭제
  const handleDeleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((ev) => ev.id !== id));
    setModalOpen(false);
    setEditingEvent(null);
  };

  // 드래그 종료 (react-beautiful-dnd)
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { draggableId, destination } = result;
    // droppableId를 "YYYY-MM-DD"로 관리한다고 가정
    const newDateStr = destination.droppableId;
    const newDate = parseISO(newDateStr);

    // 드래그된 이벤트 찾아서 start/end 수정
    setEvents((prev) => {
      return prev.map((ev) => {
        if (ev.id === draggableId) {
          // start~end 날짜 차이 유지하며 이동
          const oldStart = parseISO(ev.start);
          const oldEnd = parseISO(ev.end);
          const diffDays = differenceInCalendarDays(oldEnd, oldStart);
          const newEnd = addDays(newDate, diffDays);

          return {
            ...ev,
            start: format(newDate, "yyyy-MM-dd"),
            end: format(newEnd, "yyyy-MM-dd"),
          };
        }
        return ev;
      });
    });
  };

  return (
    <div className="p-4">
      {/* 상단 헤더 (이전/다음 달, 연/월 표시) */}
      <div className="flex items-center justify-between mb-4">
        <Button
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
          onClick={goPrevMonth}
        >
          이전 달
        </Button>
        <h2 className="text-xl font-bold">
          {year}년 {month}월
        </h2>
        <button
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
          onClick={goNextMonth}
        >
          다음 달
        </button>
      </div>

      {/* 달력 (드래그 컨텍스트) */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-7 gap-1 border-t border-l">
          {/* 요일 헤더 */}
          {["일", "월", "화", "수", "목", "금", "토"].map((dow) => (
            <div
              key={dow}
              className="text-center font-semibold border-r border-b py-2 bg-gray-100"
            >
              {dow}
            </div>
          ))}

          {/* 주 단위 렌더 */}
          {calendarMatrix.map((week, wIndex) => (
            <React.Fragment key={wIndex}>
              {week.map((day, dIndex) => {
                const cellDateStr = format(day, "yyyy-MM-dd");

                // 이번 달인지 여부
                const isCurrentMonth =
                  day.getMonth() + 1 === month && day.getFullYear() === year;

                // 해당 날짜에 걸쳐 있는 이벤트들
                const dayEvents = events.filter((ev) => isEventOnDate(ev, day));

                return (
                  <Droppable droppableId={cellDateStr} key={dIndex}>
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`border-r border-b p-1 h-24 relative cursor-pointer ${
                          isCurrentMonth
                            ? "bg-white"
                            : "bg-gray-50 text-gray-400"
                        }`}
                        onClick={() => handleCellClick(day)}
                      >
                        {/* 날짜 숫자 */}
                        <div className="text-xs mb-1">{day.getDate()}</div>

                        {/* 이벤트 표시 (단순히 순서대로 렌더) */}
                        {dayEvents.map((ev, index) => (
                          <Draggable
                            key={ev.id}
                            draggableId={ev.id}
                            index={index}
                          >
                            {(draggableProvided) => (
                              <div
                                ref={draggableProvided.innerRef}
                                {...draggableProvided.draggableProps}
                                {...draggableProvided.dragHandleProps}
                                className="bg-blue-200 rounded px-1 text-xs mb-1 truncate"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEventClick(ev);
                                }}
                              >
                                {ev.title}
                                {/* 기간 늘이기/줄이기 핸들은 상황에 맞게 추가 구현 가능 */}
                              </div>
                            )}
                          </Draggable>
                        ))}

                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </DragDropContext>

      {/* 모달 (새 계획 생성 / 기존 계획 수정) */}
      {modalOpen && editingEvent && (
        <EventModal
          event={editingEvent}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
          onClose={() => {
            setModalOpen(false);
            setEditingEvent(null);
          }}
        />
      )}
    </div>
  );
}

/** 이벤트 생성/수정 모달 */
function EventModal({
  event,
  onSave,
  onClose,
  onDelete,
}: {
  event: CalendarEvent;
  onSave: (ev: CalendarEvent) => void;
  onClose: () => void;
  onDelete: (id: string) => void;
}) {
  const [tempTitle, setTempTitle] = useState(event.title);
  const [tempStart, setTempStart] = useState(event.start);
  const [tempEnd, setTempEnd] = useState(event.end);

  const handleSave = () => {
    if (!tempTitle.trim()) return;
    onSave({
      ...event,
      title: tempTitle,
      start: tempStart,
      end: tempEnd,
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-10">
      <div className="bg-white w-80 p-4 rounded shadow relative">
        <h2 className="text-lg font-bold mb-2">
          {event.id ? "계획 수정" : "새 계획 생성"}
        </h2>
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">제목</label>
          <input
            type="text"
            value={tempTitle}
            onChange={(e) => setTempTitle(e.target.value)}
            className="border w-full px-2 py-1 rounded"
          />
        </div>

        <div className="flex space-x-2 mb-2">
          <div>
            <label className="block text-sm font-medium mb-1">시작</label>
            <input
              type="date"
              value={tempStart}
              onChange={(e) => setTempStart(e.target.value)}
              className="border px-2 py-1 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">종료</label>
            <input
              type="date"
              value={tempEnd}
              onChange={(e) => setTempEnd(e.target.value)}
              className="border px-2 py-1 rounded"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          {event.id && (
            <button
              onClick={() => onDelete(event.id)}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              삭제
            </button>
          )}
          <button onClick={onClose} className="px-3 py-1 bg-gray-200 rounded">
            취소
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
