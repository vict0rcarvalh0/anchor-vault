use anchor_lang::prelude::*;
use anchor_lang::{prelude::*, system_program::{Transfer, transfer}};

mod state;
use state::*;

mod context;
use context::*;

declare_id!("8qeyGoYHPjKDuu9jnSTM2fXuv7Q3KH94PXZwuA7pJVUT");

#[program]
pub mod anchor_vault {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        ctx.accounts.initialize(&ctx.bumps)?;

        Ok(())
    }

    pub fn deposit(ctx: Context<Operations>, amount: u64) -> Result<()> {
        ctx.accounts.deposit(amount)?;

        Ok(())
    }

    pub fn withdraw(ctx: Context<Operations>, amount: u64) -> Result<()> {
        ctx.accounts.withdraw(amount)?;

        Ok(())
    }

    pub fn close(ctx: Context<Close>) -> Result<()> {
        ctx.accounts.close()?;

        Ok(())
    }
}