'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useMounted } from '@/hooks/useMounted';
import {
  X,
  UserCheck,
  Briefcase,
  Users,
  Target,
  Sparkles,
  Dice5,
  Layers,
  ChevronRight,
  Shield,
  Heart,
  Plus,
  Bot,
  User,
} from 'lucide-react';
import {
  CharacterConfig,
  CharacterRole,
  CharacterGender,
  RoleplayScenario,
  UserLearningContext,
} from '@/types/roleplay';
import {
  DEFAULT_CHARACTERS,
  PRESET_NAMES,
  DEPARTMENTS,
  PRESET_SCENARIOS,
  getRecommendedScenarios,
  isScenarioMatchingScore,
} from '@/lib/roleplay/scenarios';
import { AVATAR_PRESETS, getAvatarPreset } from '@/lib/roleplay/avatars';
import { CharacterAvatar } from './CharacterAvatar';

interface RoleplaySetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCharacter: CharacterConfig;
  currentScenario: RoleplayScenario;
  userContext: Partial<UserLearningContext>;
  currentUserAvatar?: string;
  currentUserName?: string;
  initialTab?: 'character' | 'user' | 'scenario';
  onApply: (
    character: CharacterConfig,
    scenario: RoleplayScenario,
    userAvatar: string,
    userName: string
  ) => void;
}

export function RoleplaySetupModal({
  isOpen,
  onClose,
  currentCharacter,
  currentScenario,
  userContext,
  currentUserAvatar,
  currentUserName,
  initialTab = 'character',
  onApply,
}: RoleplaySetupModalProps) {
  const [activeTab, setActiveTab] = useState<'character' | 'user' | 'scenario'>(initialTab);

  // Sync initialTab when modal opens or initialTab prop changes
  useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  // Close modal when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Character State
  const [role, setRole] = useState<CharacterRole>(currentCharacter.role);
  const [name, setName] = useState<string>(currentCharacter.name);
  const [gender, setGender] = useState<CharacterGender>(currentCharacter.gender);
  const [age, setAge] = useState<number>(currentCharacter.age);
  const [department, setDepartment] = useState<string>(currentCharacter.department);
  const [personality, setPersonality] = useState<string>(currentCharacter.personality);
  const [avatar, setAvatar] = useState<string>(
    currentCharacter.avatar || DEFAULT_CHARACTERS[currentCharacter.role]?.avatar || 'cat-boss'
  );
  const [avatarCategory, setAvatarCategory] = useState<'chibi' | 'genz' | 'classic'>('chibi');

  // User's Own Avatar & Name State
  const [userAvatar, setUserAvatar] = useState<string>(currentUserAvatar || 'shiba-intern');
  const [userName, setUserName] = useState<string>(currentUserName || 'Bạn');
  const [userAvatarCategory, setUserAvatarCategory] = useState<'chibi' | 'genz' | 'classic'>('chibi');

  useEffect(() => {
    if (currentUserAvatar) setUserAvatar(currentUserAvatar);
    if (currentUserName) setUserName(currentUserName);
  }, [currentUserAvatar, currentUserName]);

  // Scenario State
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(currentScenario.id);
  const [scenarioFilterRole, setScenarioFilterRole] = useState<CharacterRole | 'all'>(role);
  const [isCustomScenario, setIsCustomScenario] = useState<boolean>(Boolean(currentScenario.isCustom));
  const [customTitle, setCustomTitle] = useState<string>('');
  const [customObjective, setCustomObjective] = useState<string>('');
  const [customFirstMessage, setCustomFirstMessage] = useState<string>('');

  const mounted = useMounted();
  if (!isOpen || !mounted) return null;

  const targetScore = userContext.targetScore || 650;

  // Handle role switch & defaults
  const handleRoleChange = (newRole: CharacterRole) => {
    setRole(newRole);
    setScenarioFilterRole(newRole);
    const defaults = DEFAULT_CHARACTERS[newRole];
    setName(defaults.name);
    setGender(defaults.gender);
    setAge(defaults.age);
    setDepartment(defaults.department);
    setPersonality(defaults.personality);
    setAvatar(defaults.avatar || (newRole === 'boss' ? 'cat-boss' : newRole === 'colleague' ? 'coffee-zombie' : 'shiba-intern'));

    // Pick first recommended scenario for this role
    const matching = PRESET_SCENARIOS.filter((s) => s.role === newRole);
    if (matching.length > 0) {
      setSelectedScenarioId(matching[0].id);
    }
  };

  // Random name generator based on current gender
  const handleRandomName = () => {
    const list = PRESET_NAMES[gender] || PRESET_NAMES.male;
    const randomIndex = Math.floor(Math.random() * list.length);
    setName(list[randomIndex]);
  };

  const handleGenderChange = (newGender: CharacterGender) => {
    setGender(newGender);
    const list = PRESET_NAMES[newGender] || PRESET_NAMES.male;
    setName(list[0]);
  };

  const recommendedScenarios = getRecommendedScenarios(
    userContext,
    scenarioFilterRole === 'all' ? undefined : scenarioFilterRole
  );

  const handleSaveAndStart = () => {
    const character: CharacterConfig = {
      name: name.trim() || 'Colleague',
      role,
      gender,
      age: Number(age) || 30,
      department,
      avatar,
      personality,
    };

    let scenario: RoleplayScenario;

    if (isCustomScenario && customTitle.trim()) {
      scenario = {
        id: `custom-${Date.now()}`,
        title: customTitle.trim(),
        vietnameseTitle: customTitle.trim(),
        description: customObjective.trim() || 'Tình huống tự do do người học thiết lập',
        role,
        level: targetScore <= 600 ? 'essential' : targetScore <= 780 ? 'intermediate' : 'advanced',
        targetScoreRange: `${targetScore}+`,
        department,
        objective: customObjective.trim() || 'Hoàn thành cuộc đàm thoại theo tình huống tự chọn',
        initialMessage:
          customFirstMessage.trim() ||
          `Hello! I'm ${character.name} from the ${department} team. Let's discuss our agenda today.`,
        initialTranslation: `Xin chào! Tôi là ${character.name} từ phòng ${department}. Hãy cùng thảo luận nội dung công việc hôm nay nhé.`,
        suggestedVocabulary: [],
        keyPhrases: [],
        isCustom: true,
      };
    } else {
      const found = PRESET_SCENARIOS.find((s) => s.id === selectedScenarioId);
      scenario = found || PRESET_SCENARIOS[0];
    }

    onApply(character, scenario, userAvatar, userName.trim() || 'Bạn');
    onClose();
  };

  return createPortal(
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-150 overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl h-[90vh] sm:h-[86vh] max-h-[820px] flex flex-col rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 sm:py-4 border-b border-slate-800 bg-slate-950/90 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 shrink-0">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white">Thiết Lập Nhân Vật, Avatar & Tình Huống</h2>
              <p className="text-[11px] sm:text-xs text-slate-400">
                Tùy chỉnh vai trò AI, avatar của bạn, phong cách Chibi/Gen Z và kịch bản luyện tập
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 px-3 sm:px-6 shrink-0 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('character')}
            className={`flex items-center gap-2 py-3 px-3 sm:px-4 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'character'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>1. Nhân Vật AI</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('user')}
            className={`flex items-center gap-2 py-3 px-3 sm:px-4 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'user'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-4 h-4" />
            <span>2. Avatar Của Bạn</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('scenario')}
            className={`flex items-center gap-2 py-3 px-3 sm:px-4 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'scenario'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>3. Tình Huống</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto min-h-0 p-4 sm:p-6 space-y-5">
          {activeTab === 'character' ? (
            /* TAB 1: Character Configuration */
            <div className="space-y-6">
              {/* Role Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Chọn Vai Trò Nhân Vật AI
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {/* Colleague */}
                  <button
                    type="button"
                    onClick={() => handleRoleChange('colleague')}
                    className={`flex flex-col items-center text-center p-3.5 rounded-2xl border transition-all ${
                      role === 'colleague'
                        ? 'border-indigo-500 bg-indigo-500/15 text-white ring-2 ring-indigo-500/30'
                        : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center mb-2">
                      <Users className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold">Đồng Nghiệp</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">Colleague (Ngang hàng)</span>
                  </button>

                  {/* Boss */}
                  <button
                    type="button"
                    onClick={() => handleRoleChange('boss')}
                    className={`flex flex-col items-center text-center p-3.5 rounded-2xl border transition-all ${
                      role === 'boss'
                        ? 'border-purple-500 bg-purple-500/15 text-white ring-2 ring-purple-500/30'
                        : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center mb-2">
                      <Shield className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold">Người Sếp</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">Manager / Boss</span>
                  </button>

                  {/* Staff */}
                  <button
                    type="button"
                    onClick={() => handleRoleChange('staff')}
                    className={`flex flex-col items-center text-center p-3.5 rounded-2xl border transition-all ${
                      role === 'staff'
                        ? 'border-emerald-500 bg-emerald-500/15 text-white ring-2 ring-emerald-500/30'
                        : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center mb-2">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold">Nhân Viên</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">Office Staff / Junior</span>
                  </button>
                </div>
              </div>

              {/* Avatar Selector (Chibi, Gen Z & Công Sở) */}
              <div className="space-y-3 p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                      Chọn Avatar Nhân Vật
                    </span>
                    {avatarCategory === 'chibi' ? (
                      <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-pink-500/20 border border-pink-500/35 text-pink-300">
                        🌸 Phong cách Chibi
                      </span>
                    ) : avatarCategory === 'genz' ? (
                      <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-amber-500/20 border border-amber-500/35 text-amber-300">
                        🔥 Hài hước & Gen Z
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-indigo-500/20 border border-indigo-500/35 text-indigo-300">
                        👔 Công sở chỉn chu
                      </span>
                    )}
                  </div>

                  {/* Filter tabs */}
                  <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-xl border border-slate-800 overflow-x-auto">
                    <button
                      type="button"
                      onClick={() => setAvatarCategory('chibi')}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all whitespace-nowrap ${
                        avatarCategory === 'chibi'
                          ? 'bg-pink-500/20 text-pink-300 border border-pink-500/35 shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      🌸 Chibi Dễ Thương
                    </button>
                    <button
                      type="button"
                      onClick={() => setAvatarCategory('genz')}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all whitespace-nowrap ${
                        avatarCategory === 'genz'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/35 shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      🔥 Hài Hước / Gen Z
                    </button>
                    <button
                      type="button"
                      onClick={() => setAvatarCategory('classic')}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all whitespace-nowrap ${
                        avatarCategory === 'classic'
                          ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/35 shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      👔 Truyền Thống
                    </button>
                  </div>
                </div>

                {/* Current Avatar Highlight Card */}
                {(() => {
                  const currentPreset = getAvatarPreset(avatar);
                  return (
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                      <CharacterAvatar avatarId={avatar} size="lg" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{currentPreset.name}</span>
                          <span className="text-[10px] px-2 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
                            Đang chọn
                          </span>
                        </div>
                        <p
                          className={`text-[11px] italic truncate mt-0.5 ${
                            currentPreset.category === 'chibi'
                              ? 'text-pink-300'
                              : currentPreset.category === 'genz'
                              ? 'text-amber-300'
                              : 'text-slate-300'
                          }`}
                        >
                          {currentPreset.vibe}
                        </p>
                      </div>
                    </div>
                  );
                })()}

                {/* Avatar Selection Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto pr-1">
                  {AVATAR_PRESETS.filter((p) => p.category === avatarCategory).map((preset) => {
                    const isSelected = avatar === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => setAvatar(preset.id)}
                        className={`flex items-center gap-2.5 p-2 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'border-indigo-500 bg-indigo-500/15 ring-2 ring-indigo-500/30'
                            : 'border-slate-800/80 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-900'
                        }`}
                      >
                        <CharacterAvatar preset={preset} size="sm" />
                        <div className="min-w-0 flex-1">
                          <div className="text-[11px] font-bold text-slate-200 truncate leading-tight">
                            {preset.name}
                          </div>
                          <div className="text-[9px] text-slate-400 truncate leading-tight mt-0.5">
                            {preset.vibe.replace(/^"|"$/g, '')}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Character Details: Name, Gender, Age */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Name */}
                <div className="sm:col-span-2 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-300">Tên Nhân Vật</label>
                    <button
                      type="button"
                      onClick={handleRandomName}
                      className="inline-flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 font-medium"
                    >
                      <Dice5 className="w-3.5 h-3.5" />
                      <span>Đổi tên ngẫu nhiên</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="VD: David Miller, Sarah Jenkins..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                {/* Age */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                    <span>Tuổi</span>
                    <span className="text-indigo-400 font-bold">{age} tuổi</span>
                  </label>
                  <input
                    type="range"
                    min="21"
                    max="65"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer h-2 bg-slate-800 rounded-lg mt-2"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 px-0.5">
                    <span>21</span>
                    <span>35</span>
                    <span>50</span>
                    <span>65</span>
                  </div>
                </div>
              </div>

              {/* Gender & Department */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Gender */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Giới Tính</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['male', 'female', 'other'] as CharacterGender[]).map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => handleGenderChange(g)}
                        className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                          gender === g
                            ? 'border-indigo-500 bg-indigo-500/15 text-indigo-300 font-bold'
                            : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {g === 'male' ? 'Nam' : g === 'female' ? 'Nữ' : 'Khác'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Department */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Phòng Ban Công Ty</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Personality Preview */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Phong Cách & Tính Cách</label>
                <textarea
                  value={personality}
                  onChange={(e) => setPersonality(e.target.value)}
                  rows={2}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  placeholder="Mô tả phong cách giao tiếp..."
                />
              </div>
            </div>
          ) : activeTab === 'user' ? (
            /* TAB 2: User Profile & Avatar */
            <div className="space-y-6">
              {/* Display Name Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                  <span>Tên Hiển Thị Của Bạn Trong Phòng Chat</span>
                  <span className="text-[10px] text-slate-500 lowercase font-normal">(vd: Alex, Minh, Bạn...)</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Nhập tên hoặc biệt danh của bạn..."
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setUserName('Bạn')}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all shrink-0"
                  >
                    Mặc định
                  </button>
                </div>
              </div>

              {/* User Avatar Selection */}
              <div className="space-y-3 p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                      Chọn Avatar Cho Bạn
                    </span>
                    {userAvatarCategory === 'chibi' ? (
                      <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-pink-500/20 border border-pink-500/35 text-pink-300">
                        🌸 Phong cách Chibi
                      </span>
                    ) : userAvatarCategory === 'genz' ? (
                      <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-amber-500/20 border border-amber-500/35 text-amber-300">
                        🔥 Hài hước & Gen Z
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-indigo-500/20 border border-indigo-500/35 text-indigo-300">
                        👔 Công sở chỉn chu
                      </span>
                    )}
                  </div>

                  {/* Filter tabs */}
                  <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-xl border border-slate-800 overflow-x-auto">
                    <button
                      type="button"
                      onClick={() => setUserAvatarCategory('chibi')}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all whitespace-nowrap ${
                        userAvatarCategory === 'chibi'
                          ? 'bg-pink-500/20 text-pink-300 border border-pink-500/35 shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      🌸 Chibi Dễ Thương
                    </button>
                    <button
                      type="button"
                      onClick={() => setUserAvatarCategory('genz')}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all whitespace-nowrap ${
                        userAvatarCategory === 'genz'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/35 shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      🔥 Hài Hước / Gen Z
                    </button>
                    <button
                      type="button"
                      onClick={() => setUserAvatarCategory('classic')}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all whitespace-nowrap ${
                        userAvatarCategory === 'classic'
                          ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/35 shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      👔 Truyền Thống
                    </button>
                  </div>
                </div>

                {/* Current User Avatar Highlight Card */}
                {(() => {
                  const currentPreset = getAvatarPreset(userAvatar);
                  return (
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                      <CharacterAvatar avatarId={userAvatar} size="lg" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{currentPreset.name}</span>
                          <span className="text-[10px] px-2 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
                            Avatar của bạn
                          </span>
                        </div>
                        <p
                          className={`text-[11px] italic truncate mt-0.5 ${
                            currentPreset.category === 'chibi'
                              ? 'text-pink-300'
                              : currentPreset.category === 'genz'
                              ? 'text-amber-300'
                              : 'text-slate-300'
                          }`}
                        >
                          {currentPreset.vibe}
                        </p>
                      </div>
                    </div>
                  );
                })()}

                {/* Avatar Selection Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-52 overflow-y-auto pr-1">
                  {AVATAR_PRESETS.filter((p) => p.category === userAvatarCategory).map((preset) => {
                    const isSelected = userAvatar === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => setUserAvatar(preset.id)}
                        className={`flex items-center gap-2.5 p-2 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'border-indigo-500 bg-indigo-500/15 ring-2 ring-indigo-500/30'
                            : 'border-slate-800/80 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-900'
                        }`}
                      >
                        <CharacterAvatar preset={preset} size="sm" />
                        <div className="min-w-0 flex-1">
                          <div className="text-[11px] font-bold text-slate-200 truncate leading-tight">
                            {preset.name}
                          </div>
                          <div className="text-[9px] text-slate-400 truncate mt-0.5">
                            {preset.vibe.replace(/"/g, '')}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* TAB 3: Scenario Selection */
            <div className="space-y-4">
              {/* User Roadmap Target Banner */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/20 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white">Lộ trình mục tiêu: {targetScore}+ TOEIC</span>
                    <p className="text-[11px] text-slate-400">
                      Hệ thống tự động ưu tiên các tình huống phù hợp với cấp độ từ vựng của bạn
                    </p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-[10px]">
                  {targetScore <= 600 ? 'Essential' : targetScore <= 780 ? 'Intermediate' : 'Advanced'}
                </span>
              </div>

              {/* Filter Tabs by Role */}
              <div className="flex items-center gap-2 pt-1">
                {(['all', 'colleague', 'boss', 'staff'] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => {
                      setScenarioFilterRole(r);
                      setIsCustomScenario(false);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      scenarioFilterRole === r && !isCustomScenario
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {r === 'all'
                      ? 'Tất cả'
                      : r === 'colleague'
                      ? 'Đồng nghiệp'
                      : r === 'boss'
                      ? 'Người sếp'
                      : 'Nhân viên'}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => setIsCustomScenario(true)}
                  className={`ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isCustomScenario
                      ? 'bg-violet-600 text-white'
                      : 'bg-slate-950 border border-slate-800 text-violet-400 hover:text-violet-300'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tự tạo tình huống</span>
                </button>
              </div>

              {/* Scenarios List OR Custom Scenario Form */}
              {isCustomScenario ? (
                <div className="space-y-3.5 p-4 rounded-2xl bg-slate-950/60 border border-violet-500/30">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-xs font-bold text-violet-300">
                      Tự Thiết Lập Tình Huống Giao Tiếp Của Bạn
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsCustomScenario(false)}
                      className="text-[11px] text-slate-400 hover:text-white underline"
                    >
                      Quay lại danh sách kịch bản
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Tên tình huống</label>
                    <input
                      type="text"
                      value={customTitle}
                      onChange={(e) => setCustomTitle(e.target.value)}
                      placeholder="VD: Họp đàm phán hợp đồng với đối tác quốc tế"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Mục tiêu bạn muốn đạt được (Objective)
                    </label>
                    <textarea
                      value={customObjective}
                      onChange={(e) => setCustomObjective(e.target.value)}
                      rows={2}
                      placeholder="VD: Thuyết phục đối tác giảm giá 5% và ký hợp đồng trước ngày 30"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-violet-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Câu mở đầu bằng tiếng Anh của nhân vật AI (Tùy chọn)
                    </label>
                    <input
                      type="text"
                      value={customFirstMessage}
                      onChange={(e) => setCustomFirstMessage(e.target.value)}
                      placeholder="VD: Welcome to our office! Let's get right down to business."
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                  {recommendedScenarios.map((sc) => {
                    const isSelected = selectedScenarioId === sc.id;
                    const isRoadmapMatch = isScenarioMatchingScore(sc.level, targetScore);

                    return (
                      <div
                        key={sc.id}
                        onClick={() => setSelectedScenarioId(sc.id)}
                        className={`group relative p-3.5 rounded-2xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-indigo-500 bg-indigo-500/15 shadow-md'
                            : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-950'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                                {sc.title}
                              </span>
                              {isRoadmapMatch && (
                                <span className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.2 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                                  <Sparkles className="w-2.5 h-2.5" />
                                  <span>Theo lộ trình</span>
                                </span>
                              )}
                              <span className="text-[10px] font-semibold px-2 py-0.2 rounded bg-slate-800 text-slate-400">
                                TOEIC {sc.targetScoreRange}
                              </span>
                            </div>

                            <p className="text-[11px] text-slate-400 leading-snug">
                              {sc.description}
                            </p>

                            <div className="flex items-center gap-1.5 pt-1 text-[10px] text-indigo-300">
                              <span className="font-semibold">Mục tiêu:</span>
                              <span className="text-slate-300 truncate">{sc.objective}</span>
                            </div>
                          </div>

                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-1 transition-all ${
                              isSelected
                                ? 'border-indigo-500 bg-indigo-600 text-white'
                                : 'border-slate-700 bg-slate-900'
                            }`}
                          >
                            {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 sm:px-6 py-3.5 sm:py-4 border-t border-slate-800 bg-slate-950/95 shrink-0">
          <div className="text-xs text-slate-400 flex items-center gap-2.5 min-w-0">
            <div className="flex items-center gap-1.5 shrink-0">
              <CharacterAvatar avatarId={avatar} size="xs" />
              <span className="text-white font-semibold truncate max-w-[100px]">{name}</span>
            </div>
            <span className="text-slate-600 font-bold">💬</span>
            <div className="flex items-center gap-1.5 shrink-0">
              <CharacterAvatar avatarId={userAvatar} size="xs" />
              <span className="text-indigo-300 font-semibold truncate max-w-[100px]">{userName || 'Bạn'}</span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 shrink-0">
            {activeTab === 'character' ? (
              <button
                type="button"
                onClick={() => setActiveTab('user')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all"
              >
                <span>Tiếp tục chọn avatar của bạn</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : activeTab === 'user' ? (
              <button
                type="button"
                onClick={() => setActiveTab('scenario')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all"
              >
                <span>Tiếp tục chọn tình huống</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setActiveTab('user')}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all"
              >
                <span>Quay lại avatar của bạn</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleSaveAndStart}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-500/25"
            >
              <UserCheck className="w-4 h-4" />
              <span>Bắt Đầu Hội Thoại</span>
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
