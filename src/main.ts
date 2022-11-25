import * as core from '@actions/core'
import { P4 } from '@akiojin/p4-command'

const IsWindows = process.platform.toLowerCase() === 'win32'

async function Run(): Promise<void> 
{
    try {
        if (!IsWindows) {
            throw new Error('Not supported platform.')
        }

        P4.Initialize(
            core.getInput('server'),
            core.getInput('username'),
            core.getInput('workspace'));

        core.startGroup('p4 -V')
        await P4.ShowVersion()
        core.endGroup()

        core.startGroup('p4 trust')
        await P4.Trust()
        core.endGroup()
    
        core.startGroup('p4 info')
        await P4.ShowInfo()
        core.endGroup()
    } catch (ex: any) {
        core.setFailed(ex.message);
    }
}

Run()
