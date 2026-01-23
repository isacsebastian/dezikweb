<script lang="ts">
    interface JobItem {
        title: string;
        company: string;
        duration: string;
        checked: boolean;
    }

    let jobs: JobItem[] = [
        { title: 'Business Dev.', company: 'Meta', duration: '2 mo', checked: false },
        { title: 'Account Exec.', company: 'Dropbox', duration: '3 yr', checked: false }
    ];
</script>

<div class="dashboard">
    <!-- Header -->
    <div class="dashboard-header">
        <div class="header-icons">
            <button class="icon-btn">←</button>
            <button class="icon-btn">⊙</button>
        </div>
        <div class="header-actions">
            <!-- <button class="icon-btn">↻</button> -->
            <button class="icon-btn highlight">+</button>
            <button class="icon-btn">⊞</button>
        </div>
    </div>

    <!-- Main Content -->
    <div class="dashboard-content">
        <!-- Left Section -->
        <div class="content-left">
            <div class="job-header">
                <div class="job-header-top">
                   <h2 class="job-title">Sales Exec.</h2>
                   <button class="expand-btn">⊞</button>
                </div>
                <p class="job-meta">Jul 2024 - Present</p>
            </div>

            <div class="job-list">
                {#each jobs as job}
                    <label class="job-item">
                        <input type="checkbox" bind:checked={job.checked} class="checkbox" />
                        <div class="job-info">
                            <span class="job-item-title">{job.title}</span>
                            <div class="job-item-meta">
                                <span class="company">{job.company}</span>
                                <span class="duration">• {job.duration}</span>
                            </div>
                        </div>
                    </label>
                {/each}
            </div>
            
             <!-- Footer Mini -->
            <div class="dashboard-footer-mini">
                 <button class="footer-btn-mini">Download CV</button>
            </div>
        </div>

        <!-- Right Section - Profile Card -->
        <div class="content-right">
            <div class="profile-card">
                <div class="profile-header">
                     <div class="avatar">DG</div>
                     <button class="profile-menu">⋯</button>
                </div>
               
                <div class="profile-info">
                    <h3 class="profile-name">Daphne G.</h3>
                    <p class="profile-role">Sales Executive</p>
                    <p class="profile-location">San Francisco, CA</p>
                </div>

                <div class="profile-actions">
                    <button class="icon-btn-small">◐</button>
                    <button class="icon-btn-small">◇</button>
                    <button class="icon-btn-small">☼</button>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .dashboard {
        width: 100%;
        height: 100%;
        /* Make it fit nicely in container, don't force overflow */
        min-height: 0; 
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 32px; /* Increased rounding */
        display: flex;
        flex-direction: column;
        overflow: hidden;
        color: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(16px) saturate(180%);
        -webkit-backdrop-filter: blur(16px) saturate(180%);
        box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.6);
        font-family: 'Inter', sans-serif;
        font-size: 12px; /* Base font size reduced */
    }

    /* Header */
    .dashboard-header {
        display: flex;
        justify-content: space-between;
        padding: 0.75rem 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        flex-shrink: 0;
    }

    .header-icons,
    .header-actions {
        display: flex;
        gap: 0.35rem;
    }

    .icon-btn {
        background: transparent;
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 8px; /* Softer */
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgba(255, 255, 255, 0.6);
        cursor: pointer;
        font-size: 12px;
        transition: all 0.2s;
    }
    
    .icon-btn.highlight {
        background: rgba(255, 255, 255, 0.1);
        color: white;
    }

    /* Main Content */
    .dashboard-content {
        display: grid;
        grid-template-columns: 1.2fr 0.8fr;
        gap: 0.75rem;
        padding: 0.75rem 1rem;
        flex: 1;
        overflow: hidden; /* Prevent internal scrolling if possible */
    }

    /* Left Section */
    .content-left {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        min-width: 0;
    }

    .job-header-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .job-title {
        font-size: 0.95rem; /* Smaller */
        font-weight: 600;
        margin: 0;
        color: rgba(255, 220, 150, 0.95);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .job-meta {
        font-size: 0.65rem;
        color: rgba(255, 255, 255, 0.5);
        margin: 0.1rem 0 0 0;
    }

    .expand-btn {
        background: transparent;
        border: none;
        color: rgba(255, 255, 255, 0.4);
        cursor: pointer;
        padding: 0;
        font-size: 14px;
    }

    .job-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .job-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        padding: 0.35rem;
        border-radius: 8px;
        transition: background 0.2s;
        background: rgba(255, 255, 255, 0.03);
    }
    
    .job-item:hover {
        background: rgba(255, 255, 255, 0.06);
    }

    .checkbox {
        width: 14px;
        height: 14px;
        border-radius: 4px;
        border: 1.5px solid rgba(255, 255, 255, 0.3);
        background: transparent;
        cursor: pointer;
        flex-shrink: 0;
    }

    .job-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        min-width: 0;
    }

    .job-item-title {
        font-size: 0.75rem;
        color: rgba(255, 255, 255, 0.9);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: 500;
    }

    .job-item-meta {
        display: flex;
        gap: 0.25rem;
        font-size: 0.65rem;
        align-items: center;
    }

    .company {
        color: rgba(255, 255, 255, 0.6);
    }

    .duration {
        color: rgba(255, 255, 255, 0.4);
    }

    .dashboard-footer-mini {
        margin-top: auto;
    }

    .footer-btn-mini {
        width: 100%;
        background: rgba(255, 255, 255, 0.08);
        border: none;
        border-radius: 8px;
        padding: 0.5rem;
        color: rgba(255, 255, 255, 0.7);
        cursor: pointer;
        font-size: 0.7rem;
        transition: all 0.2s;
    }
    
    .footer-btn-mini:hover {
        background: rgba(255, 255, 255, 0.12);
        color: white;
    }

    /* Right Section - Profile */
    .content-right {
        display: flex;
        flex-direction: column;
    }

    .profile-card {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 20px;
        padding: 0.75rem;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        position: relative;
    }
    
    .profile-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }

    .avatar {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 0.9rem;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .profile-menu {
        background: transparent;
        border: none;
        color: rgba(255, 255, 255, 0.5);
        font-size: 1.25rem;
        padding: 0;
        line-height: 1;
        cursor: pointer;
    }

    .profile-info {
        margin-top: 0.25rem;
    }

    .profile-name {
        font-size: 0.8rem;
        font-weight: 600;
        margin: 0;
        color: white;
    }

    .profile-role {
        font-size: 0.65rem;
        color: rgba(255, 255, 255, 0.6);
        margin: 0.1rem 0;
    }
    
    .profile-location {
        font-size: 0.6rem;
        color: rgba(255, 255, 255, 0.4);
        margin: 0;
    }

    .profile-actions {
        display: flex;
        gap: 0.25rem;
        margin-top: auto;
        justify-content: flex-end;
    }
    
    .icon-btn-small {
        background: rgba(255, 255, 255, 0.05);
        border: none;
        border-radius: 6px;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        color: rgba(255, 255, 255, 0.4);
        cursor: pointer;
    }
    
    .icon-btn-small:hover {
        background: rgba(255, 255, 255, 0.1);
        color: white;
    }
</style>
