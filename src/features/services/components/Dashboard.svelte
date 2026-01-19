<script lang="ts">
    interface JobItem {
        title: string;
        company: string;
        duration: string;
        checked: boolean;
    }

    let jobs: JobItem[] = [
        { title: 'Business Dev. Manager', company: 'Meta', duration: '2 mo', checked: false },
        { title: 'Account Executive', company: 'Dropbox', duration: '3 yr', checked: false }
    ];
</script>

<div class="dashboard">
    <!-- Header -->
    <div class="dashboard-header">
        <div class="header-icons">
            <button class="icon-btn">←</button>
            <button class="icon-btn">⊙</button>
            <button class="icon-btn">↗</button>
        </div>
        <div class="header-actions">
            <button class="icon-btn">↻</button>
            <button class="icon-btn">+</button>
            <button class="icon-btn">@</button>
            <button class="icon-btn">⊞</button>
        </div>
    </div>

    <!-- Main Content -->
    <div class="dashboard-content">
        <!-- Left Section -->
        <div class="content-left">
            <div class="job-header">
                <h2 class="job-title">Sales Executive</h2>
                <p class="job-meta">Jul 2024 - Present</p>
                <button class="expand-btn">⊞</button>
            </div>

            <div class="job-list">
                {#each jobs as job}
                    <label class="job-item">
                        <input type="checkbox" bind:checked={job.checked} class="checkbox" />
                        <div class="job-info">
                            <span class="job-item-title">{job.title}</span>
                            <div class="job-item-meta">
                                <span class="company">{job.company}</span>
                                <span class="duration">{job.duration}</span>
                            </div>
                        </div>
                    </label>
                {/each}
                <button class="view-more">+ View More</button>
            </div>

            <div class="dashboard-footer">
                <button class="footer-btn">Sara</button>
                <button class="footer-btn">Download CV</button>
            </div>
        </div>

        <!-- Right Section - Profile Card -->
        <div class="content-right">
            <div class="profile-card">
                <div class="avatar">DG</div>
                <div class="profile-badge">⌘S</div>
                <button class="profile-menu">⋯</button>
                <button class="profile-social">in</button>
                
                <div class="profile-info">
                    <h3 class="profile-name">Daphne G.</h3>
                    <p class="profile-role">Sales Executive</p>
                    <p class="profile-location">San Francisco, CA</p>
                    <p class="profile-experience">21 yrs exp</p>
                </div>

                <div class="profile-actions">
                    <button class="icon-btn">◐</button>
                    <button class="icon-btn">◇</button>
                    <button class="icon-btn">☼</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Bottom Bar -->
    <div class="bottom-bar">
        <button class="check-btn">Check</button>
        <div class="status-indicator">
            <span class="status-icon">!</span>
            <span class="status-text">Too jumpy and lacks experience with payments infrastructure...</span>
        </div>
        <button class="record-btn">●</button>
    </div>
</div>

<style>
    .dashboard {
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.01);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 24px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        color: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(12px) saturate(180%);
        -webkit-backdrop-filter: blur(12px) saturate(180%);
        box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.8);
        transition: all 0.3s ease;
    }

    .dashboard:hover {
        border-color: rgba(255, 255, 255, 0.1);
        box-shadow: 0 12px 48px 0 rgba(0, 0, 0, 0.9);
        transform: translateY(-2px);
    }

    /* Header */
    .dashboard-header {
        display: flex;
        justify-content: space-between;
        padding: 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .header-icons,
    .header-actions {
        display: flex;
        gap: 0.5rem;
    }

    .icon-btn {
        background: transparent;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 6px;
        padding: 0.5rem;
        color: rgba(255, 255, 255, 0.7);
        cursor: pointer;
        transition: all 0.2s;
    }

    .icon-btn:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.3);
        transform: scale(1.05);
    }

    /* Main Content */
    .dashboard-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
        padding: 1.5rem;
        flex: 1;
        overflow: auto;
    }

    /* Left Section */
    .content-left {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .job-header {
        position: relative;
    }

    .job-title {
        font-size: 1.1rem;
        font-weight: 600;
        margin: 0;
        color: rgba(255, 200, 100, 0.9);
    }

    .job-meta {
        font-size: 0.7rem;
        color: rgba(255, 255, 255, 0.6);
        margin: 0.25rem 0 0 0;
    }

    .expand-btn {
        position: absolute;
        top: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 6px;
        padding: 0.5rem;
        color: rgba(255, 255, 255, 0.7);
        cursor: pointer;
        transition: all 0.2s;
    }

    .expand-btn:hover {
        background: rgba(255, 255, 255, 0.15);
        border-color: rgba(255, 255, 255, 0.3);
        transform: scale(1.05);
    }

    .job-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .job-item {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        cursor: pointer;
    }

    .checkbox {
        width: 1.25rem;
        height: 1.25rem;
        border-radius: 4px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        background: transparent;
        cursor: pointer;
        appearance: none;
        transition: all 0.2s;
        flex-shrink: 0;
    }

    .checkbox:checked {
        background: rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 255, 255, 0.6);
    }

    .job-info {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }

    .job-item-title {
        font-size: 0.8rem;
        color: rgba(255, 255, 255, 0.9);
    }

    .job-item-meta {
        display: flex;
        gap: 0.75rem;
        font-size: 0.7rem;
    }

    .company {
        color: rgba(255, 255, 255, 0.7);
    }

    .duration {
        color: rgba(255, 150, 100, 0.8);
    }

    .view-more {
        background: transparent;
        border: none;
        color: rgba(255, 255, 255, 0.6);
        font-size: 0.875rem;
        cursor: pointer;
        text-align: left;
        padding: 0.5rem 0;
        transition: all 0.2s;
    }

    .view-more:hover {
        color: rgba(255, 255, 255, 0.9);
        transform: scale(1.02);
    }

    .dashboard-footer {
        display: flex;
        gap: 1rem;
        margin-top: auto;
    }

    .footer-btn {
        background: transparent;
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 8px;
        padding: 0.75rem 1.5rem;
        color: rgba(255, 255, 255, 0.8);
        cursor: pointer;
        transition: all 0.2s;
    }

    .footer-btn:hover {
        background: rgba(255, 255, 255, 0.1);
        transform: scale(1.03);
    }

    /* Right Section - Profile */
    .content-right {
        display: flex;
        flex-direction: column;
    }

    .profile-card {
        background: rgba(40, 30, 20, 0.6);
        border-radius: 12px;
        padding: 1.5rem;
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .avatar {
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 1.25rem;
    }

    .profile-badge {
        position: absolute;
        top: 1.5rem;
        right: 4rem;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 6px;
        padding: 0.25rem 0.5rem;
        font-size: 0.75rem;
    }

    .profile-menu {
        position: absolute;
        top: 1.5rem;
        right: 1.5rem;
        background: transparent;
        border: none;
        color: rgba(255, 255, 255, 0.7);
        font-size: 1.5rem;
        cursor: pointer;
        transition: all 0.2s;
    }

    .profile-menu:hover {
        color: rgba(255, 255, 255, 0.9);
        transform: scale(1.1);
    }

    .profile-social {
        position: absolute;
        top: 3.5rem;
        right: 1.5rem;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 4px;
        padding: 0.25rem 0.5rem;
        color: rgba(255, 255, 255, 0.7);
        cursor: pointer;
        transition: all 0.2s;
    }

    .profile-social:hover {
        background: rgba(255, 255, 255, 0.15);
        border-color: rgba(255, 255, 255, 0.3);
        transform: scale(1.05);
    }

    .profile-info {
        margin-top: 1rem;
    }

    .profile-name {
        font-size: 1rem;
        font-weight: 600;
        margin: 0;
    }

    .profile-role,
    .profile-location,
    .profile-experience {
        font-size: 0.7rem;
        color: rgba(255, 255, 255, 0.7);
        margin: 0.2rem 0;
    }

    .profile-actions {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        position: absolute;
        bottom: 1.5rem;
        right: 1.5rem;
    }

    /* Bottom Bar */
    .bottom-bar {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem 1.5rem;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.3);
    }

    .check-btn {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 6px;
        padding: 0.5rem 1rem;
        color: rgba(255, 255, 255, 0.8);
        cursor: pointer;
        transition: all 0.2s;
    }

    .check-btn:hover {
        background: rgba(255, 255, 255, 0.15);
        border-color: rgba(255, 255, 255, 0.3);
        transform: scale(1.05);
    }

    .status-indicator {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 6px;
        padding: 0.5rem 1rem;
    }

    .status-text {
        font-size: 0.7rem;
        color: rgba(255, 255, 255, 0.6);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .record-btn {
        background: transparent;
        border: none;
        color: rgba(255, 100, 100, 0.8);
        font-size: 1.5rem;
        cursor: pointer;
        transition: all 0.2s;
    }

    .record-btn:hover {
        color: rgba(255, 100, 100, 1);
        transform: scale(1.1);
    }
</style>
