import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import { AddFriendCard } from '@app/components/cards';

type Modals = {
    isOpen: boolean;
    onClose: () => void;
};

export const AddFriend = ({ isOpen, onClose }: Modals) => (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <AddFriendCard name="alex" />
            </ModalBody>
        </ModalContent>
    </Modal>
);
