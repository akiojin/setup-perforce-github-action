import * as core from '@actions/core'
import { P4 } from '@akiojin/p4-command'

const IsWindows = process.platform.toLowerCase() === 'win32'

async function ShowInfo(): Promise<void>
{
    core.startGroup('p4 info')
    await P4.ShowInfo()
    core.endGroup()
}

async function ShowVersion(): Promise<void>
{
    core.startGroup('p4 -V')
    await P4.ShowVersion()
    core.endGroup()
}

async function ShowUserInfo(): Promise<void>
{
    core.startGroup('p4 clients')
    await P4.ShowUserInfo()
    core.endGroup()
}

async function Trust(): Promise<void>
{
    core.startGroup('p4 trust')
    await P4.Trust()
    core.endGroup()
}

async function Run(): Promise<void> 
{
    try {
        if (!IsWindows) {
            throw new Error('Not supported platform.')
        }

        const ip = core.getInput('ip')
        const username = core.getInput('username')
        const workspace = core.getInput('workspace')
        const password = core.getInput('password')

        P4.Initialize(ip, username, workspace);

        await ShowVersion()
        await ShowInfo()
        await ShowUserInfo()
        await Trust()
    } catch (ex: any) {
        core.setFailed(ex.message);
    }
}

Run()
