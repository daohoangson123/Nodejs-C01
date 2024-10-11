import fs from 'fs';
import path from 'path';
import readline from 'node:readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const dataPath = path.resolve('src', 'data', 'posts.json');

const data = fs.readFileSync(dataPath);

const parseData = JSON.parse(data);

const main = () => {
    console.log(`Chức năng:
        1.Hiển thị danh sách post
        2.Thêm post
        3.Sửa post
        4.Xóa post`);

    const isContinue = () => {
        rl.question(`Tiếp tục? (y) `, (response) => {
            if (response === 'y') {
                main();
            } else {
                rl.close();
            }
        });
    };

    rl.question(`Chọn chức năng: `, (response) => {
        switch (response) {
            case '1':
                console.table(parseData.posts);
                isContinue();
                break;
            case '2':
                rl.question('id: ', (id) => {
                    rl.question('title: ', (title) => {
                        rl.question('content: ', (content) => {
                            rl.question('topic: ', (topic) => {
                                rl.question('author: ', (author) => {
                                    rl.question('date: ', (date) => {
                                        isContinue();
                                        const pushData = {
                                            id: id,
                                            title: title,
                                            content: content,
                                            topic: topic,
                                            author: author,
                                            date: date,
                                        };
                                        parseData.posts.push(pushData);
                                        fs.writeFileSync(
                                            dataPath,
                                            JSON.stringify(parseData)
                                        );
                                    });
                                });
                            });
                        });
                    });
                });
                break;
            case '3':
                rl.question('Id post cần sửa: ', (id) => {
                    rl.question('title: ', (title) => {
                        rl.question('content: ', (content) => {
                            rl.question('topic: ', (topic) => {
                                rl.question('author: ', (author) => {
                                    rl.question('date: ', (date) => {
                                        isContinue();
                                        const updateData = {
                                            id: +id,
                                            title: title,
                                            content: content,
                                            topic: topic,
                                            author: author,
                                            date: date,
                                        };
                                        const index = parseData.posts.findIndex(
                                            (post) => post.id === id.toString()
                                        );
                                        if (index === -1) {
                                            console.log('Id ko tồn tại');
                                        } else {
                                            parseData.posts.splice(
                                                index,
                                                1,
                                                updateData
                                            );
                                            fs.writeFileSync(
                                                dataPath,
                                                JSON.stringify(parseData)
                                            );
                                        }
                                    });
                                });
                            });
                        });
                    });
                });
                break;
            case '4':
                rl.question('Id post cần xóa: ', (id) => {
                    const index = parseData.posts.findIndex(
                        (post) => post.id === id.toString()
                    );
                    if (index === -1) {
                        console.log('Id ko tồn tại');
                    } else {
                        parseData.posts.splice(index, 1);
                        fs.writeFileSync(dataPath, JSON.stringify(parseData));
                    }
                    isContinue();
                });
                break;
            default:
                break;
        }
    });
};

main();

// while(contion ) => run program until meet condition

// 	1. Display

// 	2. Add

// 	3. Update

// 	4. Delete

// 	5. Exit

// 	realine/realine-sync

// 	1. => call function to handle something

// 	switch(choose)

// 	{

// 		case 1: =>

// 		case 2: =>

// 		....

// 	}

// 	realine/realine-sync => ask user you want to continue
