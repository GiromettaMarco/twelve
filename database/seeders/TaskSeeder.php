<?php

namespace Database\Seeders;

use App\Models\Label;
use App\Models\Priority;
use App\Models\Project;
use App\Models\Status;
use App\Models\Task;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tasks = [
            [
                'title' => "You can't compress the program without quantifying the open-source SSD pixel!",
                'text' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ex felis, pharetra at metus vitae, rutrum vestibulum mi. Etiam id metus sed ligula semper sodales dapibus a sem. Donec sodales leo suscipit, blandit libero vitae, lacinia leo. Aliquam erat volutpat. Nunc tincidunt lectus eu feugiat hendrerit. Vivamus sed sollicitudin nisl. Donec ac ligula ac eros lobortis consequat.',
                'label' => 'documentation',
                'status' => 'in progress',
                'priority' => 'medium',

            ],
            [
                'title' => 'Try to calculate the EXE feed, maybe it will index the multi-byte pixel!',
                'label' => 'documentation',
                'status' => 'backlog',
                'priority' => 'medium',

            ],
            [
                'title' => 'We need to bypass the neural TCP card!',
                'label' => 'bug',
                'status' => 'todo',
                'priority' => 'high',

            ],
            [
                'title' => 'The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!',
                'label' => 'feature',
                'status' => 'backlog',
                'priority' => 'medium',
            ],
            [
                'title' => "I'll parse the wireless SSL protocol, that should driver the API panel!",
                'status' => 'canceled',
                'label' => 'feature',
                'priority' => 'medium',
            ],
            [
                'title' => 'Use the digital TLS panel, then you can transmit the haptic system!',
                'status' => 'done',
                'label' => 'bug',
                'priority' => 'high',
            ],
            [
                'title' => 'The UTF8 application is down, parse the neural bandwidth so we can back up the PNG firewall!',
                'status' => 'done',
                'label' => 'feature',
                'priority' => 'high',
            ],
            [
                'title' => "Generating the driver won't do anything, we need to quantify the 1080p SMTP bandwidth!",
                'status' => 'in progress',
                'label' => 'feature',
                'priority' => 'medium',
            ],
            [
                'title' => 'We need to program the back-end THX pixel!',
                'status' => 'todo',
                'label' => 'feature',
                'priority' => 'low',
            ],
            [
                'title' => "Calculating the bus won't do anything, we need to navigate the back-end JSON protocol!",
                'status' => 'in progress',
                'label' => 'documentation',
                'priority' => 'high',
            ],
            [
                'title' => "Generating the driver won't do anything, we need to index the online SSL application!",
                'status' => 'done',
                'label' => 'documentation',
                'priority' => 'medium',
            ],
            [
                'title' => 'We need to override the online UDP bus!',
                'status' => 'backlog',
                'label' => 'bug',
                'priority' => 'medium',
            ],
            [
                'title' => "I'll reboot the 1080p FTP panel, that should matrix the HEX hard drive!",
                'status' => 'done',
                'label' => 'bug',
                'priority' => 'high',
            ],
            [
                'title' => 'We need to generate the virtual HEX alarm!',
                'status' => 'in progress',
                'label' => 'bug',
                'priority' => 'low',
            ],
            [
                'title' => "Backing up the pixel won't do anything, we need to transmit the primary IB array!",
                'status' => 'in progress',
                'label' => 'documentation',
                'priority' => 'low',
            ],
            [
                'title' => 'The CSS feed is down, index the bluetooth transmitter so we can compress the CLI protocol!',
                'status' => 'todo',
                'label' => 'documentation',
                'priority' => 'high',
            ],
            [
                'title' => 'Use the redundant SCSI application, then you can hack the optical alarm!',
                'status' => 'todo',
                'label' => 'documentation',
                'priority' => 'high',
            ],
            [
                'title' => 'We need to compress the auxiliary VGA driver!',
                'status' => 'backlog',
                'label' => 'bug',
                'priority' => 'high',
            ],
            [
                'title' => "Transmitting the transmitter won't do anything, we need to compress the virtual HDD sensor!",
                'status' => 'backlog',
                'label' => 'documentation',
                'priority' => 'medium',
            ],
            [
                'title' => 'The IP monitor is down, copy the haptic alarm so we can generate the HTTP transmitter!',
                'status' => 'todo',
                'label' => 'bug',
                'priority' => 'high',
            ],
            [
                'title' => "Overriding the microchip won't do anything, we need to transmit the digital OCR transmitter!",
                'status' => 'in progress',
                'label' => 'documentation',
                'priority' => 'low',
            ],
            [
                'title' => "You can't generate the capacitor without indexing the wireless HEX pixel!",
                'status' => 'canceled',
                'label' => 'bug',
                'priority' => 'low',
            ],
            [
                'title' => "Navigating the microchip won't do anything, we need to bypass the back-end SQL bus!",
                'status' => 'todo',
                'label' => 'bug',
                'priority' => 'high',
            ],
            [
                'title' => 'We need to hack the redundant UTF8 transmitter!',
                'status' => 'todo',
                'label' => 'bug',
                'priority' => 'low',
            ],
            [
                'title' => 'Use the virtual PCI circuit, then you can parse the bluetooth alarm!',
                'status' => 'canceled',
                'label' => 'documentation',
                'priority' => 'low',
            ],
            [
                'title' => "I'll input the neural DRAM circuit, that should protocol the SMTP interface!",
                'status' => 'in progress',
                'label' => 'feature',
                'priority' => 'medium',
            ],
            [
                'title' => "Compressing the interface won't do anything, we need to compress the online SDD matrix!",
                'status' => 'canceled',
                'label' => 'documentation',
                'priority' => 'medium',
            ],
            [
                'title' => "I'll synthesize the digital COM pixel, that should transmitter the UTF8 protocol!",
                'status' => 'backlog',
                'label' => 'documentation',
                'priority' => 'high',
            ],
            [
                'title' => "Parsing the feed won't do anything, we need to copy the bluetooth DRAM bus!",
                'status' => 'todo',
                'label' => 'documentation',
                'priority' => 'low',
            ],
            [
                'title' => 'We need to parse the solid state UDP firewall!',
                'status' => 'in progress',
                'label' => 'bug',
                'priority' => 'low',
            ],
            [
                'title' => 'If we back up the application, we can get to the UDP application through the multi-byte THX capacitor!',
                'status' => 'done',
                'label' => 'documentation',
                'priority' => 'high',
            ],
            [
                'title' => 'We need to synthesize the cross-platform ASCII pixel!',
                'status' => 'in progress',
                'label' => 'feature',
                'priority' => 'medium',
            ],
            [
                'title' => 'Use the back-end IP card, then you can input the solid state hard drive!',
                'status' => 'done',
                'label' => 'documentation',
                'priority' => 'low',
            ],
            [
                'title' => "Generating the alarm won't do anything, we need to generate the mobile IP capacitor!",
                'status' => 'backlog',
                'label' => 'documentation',
                'priority' => 'low',
            ],
            [
                'title' => 'If we back up the firewall, we can get to the RAM alarm through the primary UTF8 pixel!',
                'status' => 'todo',
                'label' => 'feature',
                'priority' => 'low',
            ],
            [
                'title' => "I'll compress the virtual JSON panel, that should application the UTF8 bus!",
                'status' => 'canceled',
                'label' => 'documentation',
                'priority' => 'high',
            ],
            [
                'title' => "You can't input the firewall without overriding the wireless TCP firewall!",
                'status' => 'done',
                'label' => 'bug',
                'priority' => 'high',
            ],
            [
                'title' => "Bypassing the hard drive won't do anything, we need to input the bluetooth JSON program!",
                'status' => 'in progress',
                'label' => 'bug',
                'priority' => 'high',
            ],
            [
                'title' => 'If we synthesize the bus, we can get to the IP panel through the virtual TLS array!',
                'status' => 'in progress',
                'label' => 'feature',
                'priority' => 'low',
            ],
            [
                'title' => 'We need to parse the multi-byte EXE bandwidth!',
                'status' => 'canceled',
                'label' => 'feature',
                'priority' => 'low',
            ],
            [
                'title' => 'If we compress the program, we can get to the XML alarm through the multi-byte COM matrix!',
                'status' => 'in progress',
                'label' => 'bug',
                'priority' => 'high',
            ],
            [
                'title' => 'Use the cross-platform XML application, then you can quantify the solid state feed!',
                'status' => 'todo',
                'label' => 'feature',
                'priority' => 'high',
            ],
            [
                'title' => 'Try to calculate the DNS interface, maybe it will input the bluetooth capacitor!',
                'status' => 'in progress',
                'label' => 'feature',
                'priority' => 'low',
            ],
        ];

        $project = Project::where('title', 'Work in Progress')->first();
        $labels = Label::all();
        $statuses = Status::all();
        $priorities = Priority::all();

        collect($tasks)->each(function ($taskData) use ($project, $labels, $statuses, $priorities) {
            $task = new Task([
                'title' => $taskData['title'],
                'text' => $taskData['text'] ?? null,
            ]);

            $task->project()->associate($project);

            $task->label()->associate($labels->first(function (Label $label) use ($taskData) {
                return $label->title === $taskData['label'];
            }));

            $task->status()->associate($statuses->first(function (Status $status) use ($taskData) {
                return $status->title === $taskData['status'];
            }));

            $task->priority()->associate($priorities->first(function (Priority $priority) use ($taskData) {
                return $priority->title === $taskData['priority'];
            }));

            $task->save();
        });
    }
}
