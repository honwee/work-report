let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.nav-dot');
const totalSlides = slides.length;

// 更新幻灯片计数器
document.getElementById('totalSlides').textContent = totalSlides;

// 创建浮动粒子
function createFloatingParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 80;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (8 + Math.random() * 4) + 's';
        particlesContainer.appendChild(particle);
    }
}

// 显示指定幻灯片
function showSlide(index) {
    // 移除所有活动状态
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // 设置新的活动状态
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    
    // 更新当前索引和计数器
    currentSlideIndex = index;
    document.getElementById('currentSlideNum').textContent = index + 1;
    
    // 页面切换音效（可选）
    // playSlideSound();
}

// 下一张幻灯片
function nextSlide() {
    const nextIndex = (currentSlideIndex + 1) % totalSlides;
    showSlide(nextIndex);
}

// 上一张幻灯片
function previousSlide() {
    const prevIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
    showSlide(prevIndex);
}

// 跳转到指定幻灯片
function currentSlide(index) {
    showSlide(index);
}

// 键盘控制
document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowRight':
        case ' ':
        case 'PageDown':
            event.preventDefault();
            nextSlide();
            break;
        case 'ArrowLeft':
        case 'PageUp':
            event.preventDefault();
            previousSlide();
            break;
        case 'Home':
            event.preventDefault();
            showSlide(0);
            break;
        case 'End':
            event.preventDefault();
            showSlide(totalSlides - 1);
            break;
        case 'Escape':
            toggleFullscreen();
            break;
    }
});

// 全屏切换
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

// 触摸手势支持
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipeGesture();
});

function handleSwipeGesture() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextSlide(); // 向左滑动，下一页
        } else {
            previousSlide(); // 向右滑动，上一页
        }
    }
}

// 自动播放功能（可选）
let autoPlayInterval;
function startAutoPlay(interval = 15000) {
    autoPlayInterval = setInterval(nextSlide, interval);
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

// 鼠标进入停止自动播放，离开恢复
document.addEventListener('mouseenter', stopAutoPlay);
document.addEventListener('mouseleave', () => {
    // startAutoPlay(); // 取消注释以启用自动播放
});

// 导航栏显示/隐藏控制
let navigationTimeout;
const navigation = document.querySelector('.enhanced-navigation');

function showNavigation() {
    clearTimeout(navigationTimeout);
    navigation.classList.add('show');
    
    // 3秒后自动隐藏
    navigationTimeout = setTimeout(() => {
        hideNavigation();
    }, 3000);
}

function hideNavigation() {
    navigation.classList.remove('show');
}

// 鼠标移动到页面底部显示导航
document.addEventListener('mousemove', function(e) {
    if (e.clientY > window.innerHeight - 150) {
        showNavigation();
    }
});

// 键盘操作时显示导航
document.addEventListener('keydown', function(event) {
    showNavigation();
});

// 触摸时显示导航
document.addEventListener('touchstart', function() {
    showNavigation();
});

// 点击页面其他地方隐藏导航
document.addEventListener('click', function(e) {
    if (!navigation.contains(e.target)) {
        hideNavigation();
    }
});

// 鼠标悬停导航栏时保持显示
navigation.addEventListener('mouseenter', function() {
    clearTimeout(navigationTimeout);
});

navigation.addEventListener('mouseleave', function() {
    navigationTimeout = setTimeout(() => {
        hideNavigation();
    }, 1000);
});

// 卡片详细信息数据
const cardDetailsData = {
    'work-period': {
        icon: '📅',
        title: '3个月在职期详情',
        details: [
            { icon: '📝', title: '入职适应', desc: '快速熟悉公司文化、业务流程和技术栈' },
            { icon: '🎯', title: '目标制定', desc: '制定明确的试用期工作目标和关键里程碑' },
            { icon: '📊', title: '进度跟踪', desc: '及时汇报工作进展和问题' },
            { icon: '🚀', title: '快速产出', desc: '快速完成首个AI项目的技术验证' },
            { icon: '🤝', title: '团队融入', desc: '积极参与团队建设，与各部门建立良好协作关系' }
        ]
    },
    'team-members': {
        icon: '👥',
        title: 'AI研发小组',
        details: [
            { icon: '🔍', title: '团队招聘', desc: '参与35+技术面试，严格把控人才质量标准' },
            { icon: '👨‍💻', title: '核心成员', desc: '专注AI应用开发与业务场景优化' },
            { icon: '🛠️', title: '技术配置', desc: '建立完善的开发环境和代码管理流程' },
            { icon: '📈', title: '团队效能', desc: '小而精的团队结构，保证高效协作和快速迭代' },
            { icon: '🎓', title: '技能培养', desc: '制定团队技能提升计划，定期技术分享' }
        ]
    },
    'core-projects': {
        icon: '🚀',
        title: '5个核心AI项目',
        details: [
            { icon: '📊', title: 'AI课程报告分析', desc: '626节课程验证，建立标准化评估体系' },
            { icon: '🤖', title: 'AI需求分析匹配', desc: '智能师生匹配，MVP系统已交付教务使用' },
            { icon: '📋', title: 'AI课程报告反馈', desc: '自动生成个性化学习报告，提高用户体验' },
            { icon: '🎙️', title: 'ASR转录分析系统', desc: '成本降低67%，建立完整转录处理链路' },
            { icon: '🧠', title: 'AI智能匹配优化', desc: '完成中台对接，实现全流程自动化匹配' }
        ]
    },
    'collaboration': {
        icon: '🤝',
        title: '多部门协作',
        details: [
            { icon: '👨‍🏫', title: '师资部门', desc: 'AI课程评估系统合作，建立教学质量标准' },
            { icon: '📚', title: '教务部门', desc: '需求匹配系统开发，优化师生配对流程' },
            { icon: '💼', title: '销售部门', desc: '销售场景AI智能体开发，提升转化效率' },
            { icon: '⚙️', title: '运营部门', desc: '全流程系统集成，实现业务数据闭环' },
            { icon: '🔄', title: '协作成效', desc: '建立跨部门沟通机制，项目交付成功率100%' }
        ]
    },
    'interviews': {
        icon: '🎯',
        title: '35+面试参与',
        details: [
            { icon: '📄', title: '简历筛选', desc: '制定技术岗位评估标准，提高筛选精准度' },
            { icon: '💻', title: '技术面试', desc: '全面评估候选人技术能力' },
            { icon: '🧠', title: '思维评估', desc: '关注候选人解题思路和技术架构设计能力' },
            { icon: '🤝', title: '团队匹配', desc: '评估候选人与团队文化和协作风格的契合度' },
            { icon: '📊', title: '面试反馈', desc: '建立面试反馈机制，持续优化招聘流程' }
        ]
    },
    'course-review': {
        icon: '✅',
        title: '626节课程品控',
        details: [
            { icon: '🔍', title: 'Rubric验证', desc: '建立AI评估与人工评估的高度一致性标准' },
            { icon: '🤖', title: 'AI品控系统', desc: '开发智能化课程质量监控体系' },
            { icon: '📈', title: '多轮验证', desc: '通过4轮大规模测试，确保系统稳定性' },
            { icon: '⚡', title: '效率提升', desc: '大大减少人工课程品控投入' },
            { icon: '🎯', title: '标准化建设', desc: '为大规模课程评估奠定技术基础' }
        ]
    },
    'training': {
        icon: '📚',
        title: '8次培训学习',
        details: [
            { icon: '🏢', title: '混沌学院', desc: '参与2次线下培训，获得最佳小组奖' },
            { icon: '💻', title: '技术培训', desc: '6次在线技术培训，涵盖AI前沿技术' },
            { icon: '📖', title: '管理培训', desc: '学习团队管理和项目协调技能' },
            { icon: '🎯', title: '业务培训', desc: '深入了解教育行业业务逻辑' },
            { icon: '🚀', title: '持续学习', desc: '建立个人学习计划，保持技术敏感度' }
        ]
    },
    'award': {
        icon: '🏆',
        title: '最佳小组奖',
        details: [
            { icon: '👥', title: '团队协作', desc: '在混沌学院培训中展现出色的团队合作精神' },
            { icon: '💡', title: '创新思维', desc: '提出创新性解决方案，获得导师和同学认可' },
            { icon: '🎯', title: '目标达成', desc: '高质量完成培训项目任务' },
            { icon: '🤝', title: '沟通协调', desc: '认识团队成员，发挥专长' },
            { icon: '🌟', title: '领导力体现', desc: '在团队中发挥积极的领导和指导作用' }
        ]
    }
};

// 显示卡片详情弹窗
function showCardDetail(cardType) {
    const modal = document.getElementById('cardDetailModal');
    const iconEl = document.getElementById('modalIcon');
    const titleEl = document.getElementById('modalTitle');
    const detailListEl = document.getElementById('modalDetailList');
    
    const data = cardDetailsData[cardType];
    if (!data) return;
    
    // 设置弹窗内容
    iconEl.textContent = data.icon;
    titleEl.textContent = data.title;
    
    // 生成详细信息列表
    detailListEl.innerHTML = data.details.map(detail => `
        <li>
            <div class="detail-icon">${detail.icon}</div>
            <div class="detail-content">
                <div class="detail-title">${detail.title}</div>
                <div class="detail-desc">${detail.desc}</div>
            </div>
        </li>
    `).join('');
    
    // 显示弹窗
    modal.classList.add('show');
}

// 关闭卡片详情弹窗
function closeCardModal() {
    const modal = document.getElementById('cardDetailModal');
    modal.classList.remove('show');
}

// 点击弹窗外部区域关闭
document.addEventListener('click', function(e) {
    const modal = document.getElementById('cardDetailModal');
    if (e.target === modal) {
        closeCardModal();
    }
});

// ESC键关闭弹窗
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeCardModal();
    }
});

// 展开日期卡片动画
let isExpanded = false;
function expandDateCards() {
    if (isExpanded) return;
    
    const nameCard = document.getElementById('nameCard');
    const startDateCard = document.getElementById('startDateCard');
    const endDateCard = document.getElementById('endDateCard');
    const grid = document.getElementById('titleInfoGrid');
    
    // 标记为已点击，添加科技感反馈
    nameCard.classList.add('clicked');
    
    // 平滑展开布局
    setTimeout(() => {
        grid.classList.add('expanded');
    }, 100);
    
    // 科技感的延迟展示 - 更加平滑的时序
    setTimeout(() => {
        startDateCard.classList.add('show', 'animate-in');
    }, 600);
    
    setTimeout(() => {
        endDateCard.classList.add('show', 'animate-in');
    }, 900);
    
    // 逐步移除点击效果
    setTimeout(() => {
        nameCard.style.cursor = 'default';
        nameCard.onclick = null;
    }, 400);
    
    isExpanded = true;
    
    // 清理动画类
    setTimeout(() => {
        startDateCard.classList.remove('animate-in');
        endDateCard.classList.remove('animate-in');
    }, 2100);
}

// 项目详情数据
const projectDetailsData = {
    'course-analysis': {
        title: '📊 AI课程品控项目',
        milestones: [
            {
                icon: '🔍',
                title: '项目统筹和管理',
                period: '2025年7月',
                achievements: [
                    'Rubric验证体系建立：解决评估标准描述与AI理解的对齐问题',
                    '人机协作模式：优化AI辅助人工评分的工作流程',
                    '复杂规则处理：识别并解决大模型在理解复杂评估规则时的局限性',
                    '模型局限性分析：建立模型可靠性边界与风险评估机制'
                ],
                highlight: {
                    title: '关键突破',
                    content: '通过多轮迭代验证，建立了AI评估与人工评估的一致性，为后续大规模跑量奠定基础。'
                }
            },
            {
                icon: '⚡',
                title: '大规模验证与优化',
                period: '2025年8月',
                achievements: [
                    '526节课跑量测试：多方协调完成四轮大规模验证，验证系统稳定性',
                    'AI档位覆盖率分析：对人工评分覆盖率进行深度分析，达到上线标准',
                    'API接口对接：完成与教务系统的双向数据接口设计与联调',
                    '成本核算体系：梳理了相关成本控制与评估体系，确保成本控制在可接受范围内',
                    '风险控制：应对外包团队不可控因素，建立自研的方案'
                ],
                highlight: {
                    title: '数据成果',
                    content: '526节课程分析准确率达到上线标准，AI评估覆盖率显著提升，为规模化部署提供了可靠的数据支撑。'
                }
            },
            {
                icon: '🚀',
                title: '生产部署与优化',
                period: '2025年9月',
                achievements: [
                    '生产环境部署：推进系统上线，完成生产环境配置',
                    '建立测试机制：建立基于教务角色的测试机制，确保测试质量控制',
                ],
                highlight: {
                    title: '预期效果',
                    content: '系统全面上线后，预计课程评估效率提升，大大减少人力投入。'
                }
            }
        ]
    },
    'requirement-analysis': {
        title: '🤖 AI需求分析智能体项目',
        milestones: [
            {
                icon: '🏗️',
                title: '系统架构设计',
                period: '2025年7月',
                achievements: [
                    '整体架构设计：设计可扩展的多智能体协作架构',
                    '教务流程梳理：深入分析教务匹配业务流程，识别优化点',
                    '需求挖掘：梳理师生匹配的核心需求与痛点',
                    '算法设计：制定导师匹配的智能化算法策略',
                    'ASR集成：完成语音识别与知识点提取的技术整合'
                ],
                highlight: {
                    title: '技术创新',
                    content: '首创多智能体协作的需求分析框架，为后续MVP开发提供了坚实的技术基础。'
                }
            },
            {
                icon: '💡',
                title: 'MVP智能体开发',
                period: '2025年8月',
                achievements: [
                    '需求分析智能体：基于材料分析的需求挖掘MVP',
                    '学生需求表单分析：智能化解析学生个性化需求',
                    '材料深度分析：多维度学习材料理解与分类',
                    '课程验证分析：课程内容与需求匹配度评估',
                    '导师画像分析：多维度导师能力与特长建模'
                ],
                highlight: {
                    title: '交付成果',
                    content: '为教务部门交付具备辅助功能的MVP系统，显著提升匹配效率和准确性。'
                }
            },
            {
                icon: '🎯',
                title: '多角色智能体扩展',
                period: '2025年9月',
                achievements: [
                    '中台数据对接：完成与业务中台的数据联通',
                    '报告输出优化：生成更详细的分析报告',
                    '销售角色智能体：新增销售场景的需求分析功能',
                    '多角色协作：实现教务、销售多角色协同工作'
                ],
                highlight: {
                    title: '扩展价值',
                    content: '从单一教务场景扩展到多业务场景，为公司AI能力的全面应用探索新方向。'
                }
            }
        ]
    },
    'report-feedback': {
        title: '📋 AI课程报告反馈系统',
        milestones: [
            {
                icon: '⚙️',
                title: '系统开发与集成',
                period: '2025年8月-9月',
                achievements: [
                    '内容形式确定：明确学生课程报告内容格式，完成核心功能开发',
                    'AI应用工程化：完成AI应用工程化和接口开发',
                    '知识点提取：专注知识点提取和学生改进需求分析',
                    'ASR模块对接：实现语音转录与报告生成的无缝集成',
                    '中台联调对接：建立完整的数据流链路'
                ],
                highlight: {
                    title: '效率提升',
                    content: '2小时课程20分钟完成分析，输出详细的课程地图及报告，单次成本控制在1元内。'
                }
            }
        ]
    },
    'asr-system': {
        title: '🎙️ ASR转录提取分析系统',
        milestones: [
            {
                icon: '🛠️',
                title: '全链路技术实现',
                period: '2025年9月',
                achievements: [
                    '成本优化：主导供应商测试，商务对接，ASR价格从1.5元降到0.5元',
                    '技术方案设计：完成从技术方案设计到全链路实现的完整开发',
                    '核心功能实现：包括上传、转写、回调、存储、补偿轮询等关键环节',
                    '可视化界面：提供可视化的队列任务查询界面',
                    '监控预警：建立完善的系统监控和异常预警机制'
                ],
                highlight: {
                    title: '成本控制',
                    content: '成功将转录成本降低67%，品控单节课成本控制在2元以内，关键是实现不依赖外部研发，建立自己的完整技术链路。'
                }
            }
        ]
    },
    'intelligent-matching': {
        title: '🧠 AI智能匹配系统优化',
        milestones: [
            {
                icon: '🔗',
                title: '中台集成与优化',
                period: '2025年9月',
                achievements: [
                    '中台接口联调：完成中台匹配接口的联调工作',
                    'AI工具化封装：按实际业务情况对匹配接口进行AI工具化封装',
                    '流程自动化：成功调通AI分析与智能匹配的完整链路',
                    '系统优化：为智能化师生匹配提供技术基础',
                    '功能扩展：支持多维度匹配策略和个性化推荐'
                ],
                highlight: {
                    title: '技术突破',
                    content: '实现了AI分析与智能匹配的全链路打通，为未来的智能化匹配奠定了坚实基础。'
                }
            }
        ]
    }
};

// 显示项目详情
function showProjectDetail(projectId) {
    const overview = document.getElementById('timelineOverview');
    const detailView = document.getElementById('timelineDetailView');
    const detailTitle = document.getElementById('detailTitle');
    const detailContent = document.getElementById('detailContent');
    
    const projectData = projectDetailsData[projectId];
    if (!projectData) return;
    
    // 设置标题
    detailTitle.textContent = projectData.title;
    
    // 生成详细内容
    detailContent.innerHTML = projectData.milestones.map(milestone => `
        <div class="detail-milestone">
            <div class="milestone-header">
                <div class="milestone-icon">${milestone.icon}</div>
                <div class="milestone-title">${milestone.title}</div>
                <div class="milestone-period">${milestone.period}</div>
            </div>
            <div class="milestone-achievements">
                <ul>
                    ${milestone.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                </ul>
            </div>
            <div class="achievement-highlight">
                <h5>${milestone.highlight.title}</h5>
                <p>${milestone.highlight.content}</p>
            </div>
        </div>
    `).join('');
    
    // 执行动画切换
    overview.classList.add('hidden');
    setTimeout(() => {
        detailView.classList.add('active');
    }, 300);
}

// 返回概览
function backToOverview() {
    const overview = document.getElementById('timelineOverview');
    const detailView = document.getElementById('timelineDetailView');
    
    detailView.classList.remove('active');
    setTimeout(() => {
        overview.classList.remove('hidden');
    }, 300);
}

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    // 隐藏加载动画
    setTimeout(() => {
        document.getElementById('loadingOverlay').classList.add('hidden');
    }, 1500);
    
    // 创建粒子效果
    createFloatingParticles();
    
    // 初始化第一张幻灯片
    showSlide(0);
    
    // 初始显示导航栏3秒钟，让用户知道有这个功能
    setTimeout(() => {
        showNavigation();
    }, 2000);
    
    // 添加性能监控
    console.log('PPT加载完成，总共', totalSlides, '张幻灯片');
});

// 性能优化：预加载下一张幻灯片的资源
function preloadNextSlide() {
    const nextIndex = (currentSlideIndex + 1) % totalSlides;
    const nextSlide = slides[nextIndex];
    // 这里可以添加图片预加载逻辑
}

// 添加页面可见性检测
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        stopAutoPlay();
    } else {
        // 页面重新可见时的处理
    }
});