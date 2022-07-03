import subprocess
import sys
import cmd
import re
import os

os.environ['SYSTEMD_COLORS'] = '1'


def shellWebsite(arg):
    with open('./__pycache__/test.log', 'wb') as f:
        process = subprocess.Popen(
            arg, stdout=subprocess.PIPE, cwd=r'./Website')
        for c in iter(lambda: process.stdout.read(1), b''):
            sys.stdout.buffer.write(c)
            f.write(c)


class MMRLBuildTools(cmd.Cmd):
    prompt = 'mmrl-tools$ '
    intro = "Welcome! Type ? to list commands"

    def do_install(self, arg):
        shellWebsite(['npm', "install", arg])

    def do_uninstall(self, arg):
        shellWebsite(['npm', "uninstall", arg])

    def do_installDev(self, arg):
        shellWebsite(['npm', "install", "--save-dev", arg])

    def do_uninstallDev(self, arg):
        shellWebsite(['npm', "uninstall", "--save-dev", arg])

    def do_dev(self, arg):
        shellWebsite(['npm', "run", "build-dev"])

    def do_prod(self, arg):
        shellWebsite(['npm', "run", "build-prod"])

    def do_exit(self, arg):
        print("Bye")
        return True

    def default(self, line):
        if line == 'x' or line == 'q':
            return self.do_exit(line)

        self.stdout.write('%s is unknown\n' % line)


if __name__ == '__main__':
    MMRLBuildTools().cmdloop()
