use anchor_lang::prelude::*;

// This is your program's public key and it will update
// automatically when you build the project.
declare_id!("4sGDKj9UN85ogKYay7STCtcSt6Gn7uj1fSDs5hZqVY64");

#[program]
pub mod ai_registry {
    use super::*;

    pub fn register_agent(
        ctx: Context<RegisterAgent>, 
        name: String, 
        description: String, 
        agent_key: Pubkey
    ) -> Result<()> {
        require!(name.len() <= 100, ErrorCode::NameTooLong);
        require!(description.len() <= 500, ErrorCode::DescriptionTooLong);
        require!(
            name.chars().all(|c| c.is_alphanumeric() || c.is_whitespace()),
            ErrorCode::InvalidCharacters
        );
        require!(
            description.chars().all(|c| c.is_alphanumeric() || c.is_whitespace() || c.is_ascii_punctuation()),
            ErrorCode::InvalidCharacters
        );
        let agent = &mut ctx.accounts.agent;
        let clock = Clock::get()?;
        
        require!(
            clock.unix_timestamp > 0,
            ErrorCode::InvalidTimestamp
        );

        agent.name = name;
        agent.description = description;
        agent.agent_key = agent_key;
        agent.status = AgentStatus::Active;
        agent.created_at = clock.unix_timestamp;
        agent.updated_at = clock.unix_timestamp;
        agent.owner = ctx.accounts.user.key();

        emit!(AgentRegistered {
            agent_address: agent.key(),
            name: agent.name.clone(),
            description: agent.description.clone(),
            agent_key: agent.agent_key,
            owner: agent.owner,
            status: agent.status,
            timestamp: agent.created_at,
        });

        Ok(())
    }

    pub fn update_agent(
    ctx: Context<UpdateAgent>, 
    name: Option<String>, 
    description: Option<String>, 
    agent_key: Option<Pubkey>
) -> Result<()> {
    let agent = &mut ctx.accounts.agent;
    let clock = Clock::get()?;
    
    require!(
        clock.unix_timestamp >= agent.updated_at,
        ErrorCode::InvalidTimestamp
    );

    if let Some(name) = name {
        require!(name.len() <= 100, ErrorCode::NameTooLong);
        require!(
            name.chars().all(|c| c.is_alphanumeric() || c.is_whitespace()),
            ErrorCode::InvalidCharacters
        );
        agent.name = name;
    }

    if let Some(description) = description {
        require!(description.len() <= 500, ErrorCode::DescriptionTooLong);
        require!(
            description.chars().all(|c| c.is_alphanumeric() || c.is_whitespace() || c.is_ascii_punctuation()),
            ErrorCode::InvalidCharacters
        );
        agent.description = description;
    }

    if let Some(agent_key) = agent_key {
        agent.agent_key = agent_key;
    }

    agent.updated_at = clock.unix_timestamp;

    emit!(AgentUpdated {
        agent_address: agent.key(),
        name: agent.name.clone(),
        description: agent.description.clone(),
        agent_key: agent.agent_key,
        owner: agent.owner,
        status: agent.status,
        timestamp: agent.updated_at,
    });

    Ok(())
}

pub fn update_status(ctx: Context<UpdateAgent>, new_status: AgentStatus) -> Result<()> {
    let agent = &mut ctx.accounts.agent;
    let clock = Clock::get()?;

    require!(
        clock.unix_timestamp >= agent.updated_at,
        ErrorCode::InvalidTimestamp
    );

    agent.status = new_status;
    agent.updated_at = clock.unix_timestamp;

    emit!(AgentStatusUpdated {
        agent_address: agent.key(),
        status: agent.status,
        timestamp: agent.updated_at,
    });

    Ok(())
}
}

#[derive(Accounts)]
pub struct RegisterAgent<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + Agent::LEN
    )]
    pub agent: Account<'info, Agent>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateAgent<'info> {
    #[account(
        mut,
        constraint = agent.owner == user.key() @ ErrorCode::UnauthorizedOperation,
        constraint = agent.status != AgentStatus::Deactivated @ ErrorCode::AgentDeactivated,
    )]
    pub agent: Account<'info, Agent>,
    pub user: Signer<'info>,
}

#[account]
pub struct Agent {
    pub name: String,
    pub description: String,
    pub agent_key: Pubkey,
    pub owner: Pubkey,
    pub status: AgentStatus,
    pub created_at: i64,
    pub updated_at: i64,
    pub reserved: [u8; 32], // Changed to 32 bytes which has Default impl
}

impl Default for Agent {
    fn default() -> Self {
        Self {
            name: String::default(),
            description: String::default(),
            agent_key: Pubkey::default(),
            owner: Pubkey::default(),
            status: AgentStatus::default(),
            created_at: 0,
            updated_at: 0,
            reserved: [0u8; 32],
        }
    }
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Default, Copy)]
pub enum AgentStatus {
    #[default]
    Active,
    Inactive,
    Deactivated,
}

impl Agent {
    pub const LEN: usize = 
        4 + // String prefix for name
        100 + // name max length
        4 + // String prefix for description
        500 + // description max length
        32 + // agent_key
        32 + // owner
        1 + // status (enum)
        8 + // created_at
        8 + // updated_at
        64; // reserved space
}

#[error_code]
pub enum ErrorCode {
    #[msg("Name must be 100 characters or less")]
    NameTooLong,
    #[msg("Description must be 500 characters or less")]
    DescriptionTooLong,
    #[msg("Only the owner can perform this operation")]
    UnauthorizedOperation,
    #[msg("Cannot modify a deactivated agent")]
    AgentDeactivated,
    #[msg("Invalid characters in input")]
    InvalidCharacters,
    #[msg("Invalid timestamp")]
    InvalidTimestamp,
}

#[event]
pub struct AgentRegistered {
    pub agent_address: Pubkey,
    pub name: String,
    pub description: String,
    pub agent_key: Pubkey,
    pub owner: Pubkey,
    pub status: AgentStatus,
    pub timestamp: i64,
}

#[event]
pub struct AgentUpdated {
    pub agent_address: Pubkey,
    pub name: String,
    pub description: String,
    pub agent_key: Pubkey,
    pub owner: Pubkey,
    pub status: AgentStatus,
    pub timestamp: i64,
}

#[event]
pub struct AgentStatusUpdated {
    pub agent_address: Pubkey,
    pub status: AgentStatus,
    pub timestamp: i64,
}